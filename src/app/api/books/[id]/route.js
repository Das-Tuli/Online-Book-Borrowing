import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/lib/models/Book";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET single book details
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const bookObj = book.toObject();
    bookObj.id = bookObj._id.toString();

    return NextResponse.json(bookObj);
  } catch (error) {
    console.warn("DB connection failed, falling back to static JSON for single book:", error.message);
    try {
      const { id } = await params;
      const booksData = require("@/data/books.json");
      const book = booksData.find(b => b.id.toString() === id.toString());
      
      if (!book) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }

      return NextResponse.json(book);
    } catch (fallbackError) {
      console.error("Fallback error fetching book:", fallbackError);
      return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
    }
  }
}

// POST borrow book
export async function POST(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    // Check session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find and update the book
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    if (book.available_quantity <= 0) {
      return NextResponse.json({ error: "Book is out of stock" }, { status: 400 });
    }

    book.available_quantity -= 1;
    await book.save();

    const bookObj = book.toObject();
    bookObj.id = bookObj._id.toString();

    return NextResponse.json({
      message: "Book borrowed successfully",
      book: bookObj,
    });
  } catch (error) {
    console.warn("DB connection or auth failed, mocking borrow action with static JSON:", error.message);
    try {
      const { id } = await params;
      const booksData = require("@/data/books.json");
      const book = booksData.find(b => b.id.toString() === id.toString());

      if (!book) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }

      const updatedBook = {
        ...book,
        available_quantity: Math.max(0, book.available_quantity - 1)
      };

      return NextResponse.json({
        message: "Book borrowed successfully (Fallback Mock)",
        book: updatedBook,
      });
    } catch (fallbackError) {
      console.error("Fallback error borrowing book:", fallbackError);
      return NextResponse.json({ error: "Failed to borrow book" }, { status: 500 });
    }
  }
}


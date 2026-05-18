import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/lib/models/Book";
import booksData from "@/data/books.json";

export async function GET(req) {
  try {
    await dbConnect();
    
    // Check if we need to seed the database
    const count = await Book.countDocuments();
    if (count === 0) {
      await Book.insertMany(booksData);
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let query = {};
    
    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    let dbQuery = Book.find(query).sort({ createdAt: -1 });

    if (limit) {
      dbQuery = dbQuery.limit(parseInt(limit));
    }

    const books = await dbQuery;

    // Standardize IDs for the frontend
    const serializedBooks = books.map(book => {
      const bookObj = book.toObject();
      bookObj.id = bookObj._id.toString();
      return bookObj;
    });

    return NextResponse.json(serializedBooks);
  } catch (error) {
    console.warn("DB connection failed, falling back to static JSON data:", error.message);
    
    try {
      const { searchParams } = new URL(req.url);
      const limit = searchParams.get("limit");
      const category = searchParams.get("category");
      const search = searchParams.get("search");

      let filtered = [...booksData];

      if (category && category !== "All") {
        filtered = filtered.filter(b => b.category.toLowerCase() === category.toLowerCase());
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(b => b.title.toLowerCase().includes(searchLower));
      }

      if (limit) {
        filtered = filtered.slice(0, parseInt(limit));
      }

      return NextResponse.json(filtered);
    } catch (fallbackError) {
      console.error("Fallback failed:", fallbackError);
      return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
    }
  }
}


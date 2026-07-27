import { NextResponse } from 'next/server'
import { getProducts, addProduct, deleteProduct } from '@/lib/products'

// GET /api/products
export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newProduct = await addProduct({
      name: body.name,
      category: body.category.toLowerCase().trim(),
      type: body.type,
      price: body.price,
      image: body.image || '/images/hero-couple.png',
      available: true,
    })
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

// DELETE /api/products?id=XYZ
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 })
    }

    const success = await deleteProduct(id)

    if (success) {
      return NextResponse.json({ message: 'Product deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
import fs from 'fs'
import path from 'path'

export interface Product {
  id: string
  name: string
  category: string
  type: 'rental' | 'sale' | 'both'
  price: string
  image: string
  available: boolean
}

const filePath = path.join(process.cwd(), 'data', 'products.json')

function ensureFileExists() {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(filePath)) {
    const initialProducts: Product[] = [
      {
        id: '1',
        name: 'Royal Purple Aso Oke Set',
        category: 'couples',
        type: 'both',
        price: '180',
        image: '/images/hero-couple.png',
        available: true,
      },
    ]
    fs.writeFileSync(filePath, JSON.stringify(initialProducts, null, 2))
  }
}

export async function getProducts(): Promise<Product[]> {
  ensureFileExists()
  const fileData = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileData)
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const products = await getProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
  }
  products.push(newProduct)
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2))
  return newProduct
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts()
  const updatedProducts = products.filter((p) => p.id !== id)

  if (products.length === updatedProducts.length) {
    return false
  }

  fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2))
  return true
}
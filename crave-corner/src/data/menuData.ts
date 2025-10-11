// src/data/menuData.ts

export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  available: boolean
  image?: string
}

export const menuData: MenuItem[] = [
  {
    id: "1",
    name: "Chicken Biryani",
    price: 850,
    category: "Main Course",
    available: true,
    image: "/images/biryani.jpg",
  },
  {
    id: "2",
    name: "Veg Burger",
    price: 420,
    category: "Fast Food",
    available: true,
    image: "/images/burger.jpg",
  },
  {
    id: "3",
    name: "Chocolate Cake",
    price: 300,
    category: "Dessert",
    available: false,
    image: "/images/cake.jpg",
  },
  {
    id: "4",
    name: "Lemonade",
    price: 120,
    category: "Drinks",
    available: true,
    image: "/images/lemonade.jpg",
  },
  {
    id: "5",
    name: "Zinger Roll",
    price: 250,
    category: "Fast Food",
    available: true,
    image: "/images/roll.jpg",
  },
  {
    id: "6",
    name: "Mango Shake",
    price: 200,
    category: "Drinks",
    available: false,
    image: "/images/mango-shake.jpg",
  },
]

import axios from "axios"

const collection_url = "http://localhost:5000/api/collections"
const product_url = "http://localhost:5000/api/products"
const collections = [
    {
        title: "Laptop",
        description: "Your next work buddy",
        image: "https://i.pinimg.com/1200x/97/22/7f/97227f94ad4415049f45d0012abee7ef.jpg",
    },
    {
        title: "Phone",
        description: "To connect with your loved ones",
        image: "https://i.pinimg.com/1200x/60/1e/d6/601ed6b47bb0406a2ce6db4e10698b02.jpg",
    },
    {
        title: "Speaker",
        description: "Play music in style",
        image: "https://i.pinimg.com/736x/ae/fa/e0/aefae0481aba8d6a550885cc7cd53857.jpg",
    },
]

export const products = [
  {
    name: "MacBook Pro M3",
    description: "Apple's latest MacBook Pro powered by the M3 chip for blazing fast performance and all-day battery life.",
    category: "Laptop",
    price: 199900,
    images: ["https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.nO6fRoxbmIjfghEynf60NwHaE8%3Fpid%3DApi&sp=1773116216Tc2e58e07b6da10eb5e11f0387b7e7af06de94476392b56acb11452e00a28e9de"],
    createdAt: new Date()
  },
  {
    name: "Dell XPS 15",
    description: "Premium Windows laptop with stunning OLED display, powerful Intel processor, and sleek aluminum design.",
    category: "Laptop",
    price: 175000,
    images: ["https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.4u38tWNHWB_3npuBjtMSmgHaEK%3Fpid%3DApi&sp=1773116249Tefd21c58c4ca848faf4390b2a581c688499c94499f74dbf070e65690361508f9"],
    createdAt: new Date()
  },
  {
    name: "ASUS ROG Zephyrus G14",
    description: "High-performance gaming laptop with Ryzen processor and RTX graphics in a compact chassis.",
    category: "Laptop",
    price: 165000,
    images: ["https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.fygbAgnAGOuIWxLKc2JvAQHaEK%3Fpid%3DApi&sp=1773116387T4cbcd5f98d824dbba740849b256f73a6f46955171ea766c7e1180259fa9b92a3"],
    createdAt: new Date()
  },
  {
    name: "Lenovo Legion 5 Pro",
    description: "Powerful gaming laptop with high refresh rate display and RTX graphics for serious gaming performance.",
    category: "Laptop",
    price: 145000,
    images: ["https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.fygbAgnAGOuIWxLKc2JvAQHaEK%3Fpid%3DApi&sp=1773116387T4cbcd5f98d824dbba740849b256f73a6f46955171ea766c7e1180259fa9b92a3"],
    createdAt: new Date()
  },
  {
    name: "iPhone 15 Pro",
    description: "Apple flagship smartphone with titanium body, A17 chip, and advanced camera system.",
    category: "Phone",
    price: 134900,
    images: [""],
    createdAt: new Date()
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Samsung's premium flagship phone featuring a powerful Snapdragon processor and a 200MP camera.",
    category: "Phone",
    price: 129999,
    images: [""],
    createdAt: new Date()
  },
  {
    name: "Google Pixel 8 Pro",
    description: "AI-powered smartphone with exceptional camera performance and pure Android experience.",
    category: "Phone",
    price: 106999,
    images: [""],
    createdAt: new Date()
  },
  {
    name: "OnePlus 12",
    description: "Flagship killer smartphone with Snapdragon processor, fast charging, and smooth OxygenOS experience.",
    category: "Phone",
    price: 64999,
    images: [""],
    createdAt: new Date()
  },
  {
    name: "Sony SRS-XG300",
    description: "Portable Bluetooth speaker delivering powerful bass and long battery life.",
    category: "Speaker",
    price: 27990,
    images: [""],
    createdAt: new Date()
  },
  {
    name: "JBL Charge 5",
    description: "Waterproof portable speaker with powerful sound and built-in power bank.",
    category: "Speaker",
    price: 17999,
    images: [""],
    createdAt: new Date()
  },
  {
    name: "Bose SoundLink Flex",
    description: "Compact premium Bluetooth speaker with balanced sound and rugged portability.",
    category: "Speaker",
    price: 15900,
    images: [""],
    createdAt: new Date()
  },
  {
    name: "Marshall Emberton II",
    description: "Stylish portable speaker with rich sound signature and long battery life.",
    category: "Speaker",
    price: 18999,
    images: [""],
    createdAt: new Date()
  }
]

async function populateCollection() {
    try {

        for (const c of collections) {
            const res = await axios.post(collection_url, c);
            console.log("Inserted: ", res.data.name);
        }

        console.log("Collections populated successfully!");
    } catch (error) {
        console.error("Error populating collections: ", error);
        process.exit(1)
    }
}

async function populateProduct() {
    try {

        for (const p of products) {
            const res = await axios.post(product_url, p);
            console.log("Inserted: ", res.data.title);
        }

        console.log("Products populated successfully!");
    } catch (error) {
        console.error("Error populating products: ", error);
        process.exit(1)
    }
}

async function runSeed() {
    await populateCollection()
    await populateProduct()
    process.exit()
}

runSeed()
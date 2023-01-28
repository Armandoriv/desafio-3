import { promises as fs } from "fs";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.txt";
  }

  static id = 0;

  writeProducts = async (productos) => {
    await fs.writeFile(this.path, JSON.stringify(productos), (error) => {
      if (error) throw error;
    });
  };

  readProducts = async () => {
    let allProducts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(allProducts);
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    ProductManager.id++;
    this.products.push({
      ...newProduct,
      id: ProductManager.id,
    });

    await this.writeProducts(this.products);
  };

  getProducts = async () => {
    let productsAll = await this.readProducts();
    console.log(productsAll);
  };

  exist = async (id) => {
    let productsAll = await this.readProducts();
    return productsAll.find((product) => product.id === id);
  };

  getProductsById = async (id) => {
    (await this.exist(id))
      ? console.log(await this.exist(id))
      : console.log("NOT FOUND");
  };

  updateProduct = async ({ id, ...produt }) => {
    if ((await this.deleteProducts(id)) === false) {
      console.log("El Producto que intenta modificar no existe");
    } else {
      let prod = await this.readProducts();
      let modifiedProducts = [
        {
          id: id,
          ...produt,
        },
        ...prod,
      ];
      await this.writeProducts(modifiedProducts);
      console.log("Producto modificado Correctamente");
    }
  };
  deleteProducts = async (id) => {
    if (await this.exist(id)) {
      let products = await this.readProducts();
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
    } else {
      console.log("NOT FOUND");
      return false;
    }
  };
}

//const productos = new ProductManager();

 //                           #1 Agregamos Productos
 /*productos.addProduct(
  "Mario Bros",
  "Juego de Nintendo",
  1500,
  "mario.jpg",
  "abc123",
  5
);

productos.addProduct(
  "Halo 2",
  "Juego de Microsoft",
  2000,
  "Halo2.jpg",
  "abc124",
  3
); 

productos.addProduct(
  "Crash Bandicoot",
  "Juego de Sony",
  2000,
  "crashB.jpg",
  "abc125",
  10
); 

productos.addProduct(
  "DOOM",
  "Juego de PC",
  1000,
  "DOOM.jpg",
  "abc127",
  3
); 

productos.addProduct(
  "Alan Wake",
  "Juego de Xbox",
  2000,
  "Alanw.jpg",
  "abc128",
  15
); 

productos.addProduct(
  "Hotline Miami",
  "Juego de PC",
  1500,
  "HotM.jpg",
  "abc129",
  20
); 

productos.addProduct(
  "Spyro the Dragon",
  "Juego de Sony",
  1000,
  "Spyro.jpg",
  "abc130",
  6
); 

productos.addProduct(
  "Gears of War",
  "Juego de Xbox",
  2000,
  "Gears.jpg",
  "abc131",
  10
); 

productos.addProduct(
  "The Last of Us",
  "Juego de Sony",
  2500,
  "TLU.jpg",
  "abc132",
  20
); 

productos.addProduct(
  "Maincra 2",
  "Juego de PC",
  2000,
  "MC2.jpg",
  "abc133",
  25
); */



//                        2# Consultamos todos los Productos existentes
//productos.getProducts();


//                          3# Consultamos un Producto por su ID
//productos.getProductsById(3);


//         4# Actualizamos un Producto existente (volver al paso 3 para verificar el cambio)
/* productos.updateProduct({
  title: "Crash Bandicoot",
  description: "Juego de Sony",
  price: 2500,                      //(Se modifica precio)
  thumbnail: "crashB.jpg",
  code: "abc125",
  stock: 5,
  id: 3,
}); */

//      5# eliminamos un Producto por su ID (Volver al paso 1 para verificar el cambio)
//productos.deleteProducts(3);


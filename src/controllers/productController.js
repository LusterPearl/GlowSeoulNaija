import Product from '../models/product';

class ProductController {
  static async createProduct(req, res) {
    const { name, description, price, quantity, category } = req.body;
    const product = new Product({ name, description, price, quantity, category });

    try {
      const productId = await product.save();
      return res.status(201).json({ message: 'Product created successfully', productId });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating product', error });
    }
  }

  static async getProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching product', error });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching products', error });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const updated = await Product.update(id, updatedData);
      if (updated) {
        return res.json({ message: 'Product updated successfully' });
      }
      return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating product', error });
    }
  }

  static async getProductsByCategory(req, res) {
    const { category } = req.params;

    try {
      const products = await Product.findAll();
      const filteredProducts = products.filter((product) => product.category.includes(category));
      return res.json(filteredProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching products', error });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Product.delete(id);
      if (deleted) {
        return res.json({ message: 'Product deleted successfully' });
      }
      return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting product', error });
    }
  }
}

export default ProductController;

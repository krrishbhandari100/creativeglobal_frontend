// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let products = {}
  let resp = await fetch(`http://localhost:1337/api/products?filters[slug][$eq]=${req.query.slug}&populate=*`);
  let data = await resp.json();
  for (const product of data.data) {
    if (product.attributes.title in products) {
      if (!products[product.attributes.title].color.includes(product.attributes.color)) {
        products[product.attributes.title].color.push(product.attributes.color);
      }
      
      if (!products[product.attributes.title].size.includes(product.attributes.size)) {
        products[product.attributes.title].size.push(product.attributes.size);
      }
    }
    else {
      products[product.attributes.title] = product;
      products[product.attributes.title].size = [product.attributes.size]
      products[product.attributes.title].color = [product.attributes.color]
    }
  }
  res.status(200).json(products);
}

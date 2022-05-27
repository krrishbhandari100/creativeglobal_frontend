// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let allProds = {};

  let resp = await fetch('http://localhost:1337/api/products?populate=*');
  let data = await resp.json();

  for (const product of data.data) {
    if (product.attributes.title in allProds) {
      if (!allProds[product.attributes.title].color.includes(product.attributes.color)) {
        allProds[product.attributes.title].color.push(product.attributes.color);
      }
      
      if (!allProds[product.attributes.title].size.includes(product.attributes.size)) {
        allProds[product.attributes.title].size.push(product.attributes.size);
      }
    }
    else {
      allProds[product.attributes.title] = product;
      allProds[product.attributes.title].size = [product.attributes.size]
      allProds[product.attributes.title].color = [product.attributes.color]
    }
  }

  res.status(200).json(allProds)
}

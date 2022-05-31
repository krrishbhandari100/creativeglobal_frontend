// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let { title } = req.query;
  let colorSizeSlug = {};
  let resp = await fetch(`http://localhost:1337/api/products?filters[title][$eq]=${title}&populate=*`)
  let data = await resp.json();

  data.data.forEach(variant => {
    /*{red: 
        {xl:
          {slug: 'this-is-prod'}
        }
      }*/
    if(Object.keys(colorSizeSlug).includes(variant.attributes.color)){
      colorSizeSlug[variant.attributes.color][variant.attributes.size] = {slug: variant.attributes.slug, qty: variant.attributes.qty}
    }
    else {
      colorSizeSlug[variant.attributes.color] = {};
      colorSizeSlug[variant.attributes.color][variant.attributes.size] = {slug: variant.attributes.slug, qty: variant.attributes.qty}
    }
  });
  res.status(200).json(colorSizeSlug);
}

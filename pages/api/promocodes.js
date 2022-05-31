// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let promocodes = {};

  let resp = await fetch('http://localhost:1337/api/promocodes');
  let data = await resp.json();
  data.data.forEach(pcode => {
    promocodes[pcode.attributes.promocode] = {discount: pcode.attributes.discount, Llimit: pcode.attributes.Llimit, Ulimit: pcode.attributes.Ulimit}
  });
  res.status(200).json(promocodes);
}

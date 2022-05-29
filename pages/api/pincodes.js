// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

export default async function handler(req, res) {
  let pincodes = {};
  let resp = await fetch('http://localhost:1337/api/pincodes');
  let data = await resp.json();
  data.data.forEach(pincode => {
    pincodes[pincode.attributes.pincode] = [pincode.attributes.city, pincode.attributes.state]
  });
  res.status(200).json(pincodes)
}

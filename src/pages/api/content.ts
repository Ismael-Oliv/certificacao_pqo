// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const certificado = req.body;
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at("document.type", certificado),
  ]);

  const content = response.results.map((cont) => {
    return {
      id: cont.id,
      slug: cont.uid,
      title: RichText.asText(cont.data.title),
      excerpt: RichText.asHtml(cont.data.content),
    };
  });

  res.json(content);
}

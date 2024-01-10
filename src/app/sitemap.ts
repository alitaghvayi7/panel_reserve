import { MetadataRoute } from "next";
import { headers } from "next/headers";


export default async function sitemap(props: any): Promise<MetadataRoute.Sitemap> {

  const headersList = headers();

  const host = headersList.get('host')
  const proto = headersList.get('x-forwarded-proto')
  const site = `${proto}://${host}`

  return [
    {
      url: `${site}`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${site}/follow-up-cases`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${site}/tickets`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${site}/votes-clarity`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${site}/wealth`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${site}/candidate-info/awards`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${site}/candidate-info/cv`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${site}/candidate-info/programs`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
  ];
}

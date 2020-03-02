import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "../components/header"
import HomeGame from "../components/home-game"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
     {
      site {
        siteMetadata {
          title
          role
          description
          who
          siteUrl
        }
      }
    }
  `)

  return (
    <>
      <SEO title="Alberto Fortes" description={data.site.siteMetadata.description} siteUrl={data.site.siteMetadata.siteUrl} />
      <Header className="header" 
        siteTitle={data.site.siteMetadata.title}
        siteRole={data.site.siteMetadata.role}
        siteDescription={data.site.siteMetadata.description}
      />
      <HomeGame 
        siteRole={data.site.siteMetadata.role}
        siteDescription={data.site.siteMetadata.who}
      />
    </>
  )
}

export default IndexPage

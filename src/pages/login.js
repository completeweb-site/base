import React from "react";
// import useSiteMetadata from "../hooks/SiteMetadata"
// import { StaticImage } from "gatsby-plugin-image"
// import {Link} from "gatsby"
import styled from "styled-components"
import Layout from "../components/siteLayout"
import { Helmet } from "react-helmet"

const CustomBox = styled.div`


`

function Test2() {

  
  


  return (

    <CustomBox>
<Layout>
<Helmet>
        <body id="body" className="social" />
      </Helmet>

<div className="scroll-container1" style={{display:'flex', justifyContent:'start', maxWidth:'', height:'100vh', margin:'0 auto 0 auto', position:'fixed', left:'0', right:'0', top:'0'}}>
<iframe title="VidSock" id="youtube2" className="blog-video1" width="100%" height="400" src="/admin/" frameBorder="0" playsInline  style={{position:'absolute', top:'0', left:'0', right:'0', zIndex:'0', width:'100%', height:'100vh', minHeight:'100vh', border:'0px solid yellow', borderRadius:'12px', padding:'60px 0 0 0' }} />


</div>





</Layout>



      </CustomBox>
  );
}

export default Test2;



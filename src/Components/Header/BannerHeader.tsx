"use client"
import Image from "next/image";
import React from "react";
import "../../Styles/styleheaderbanner.css"
import banner1 from "../../../public/Images/1200x450__si_u_u_i_tr_g_p.png"
import banner2 from "../../../public/Images/1200x450_tr_g_p_qua_HD_Saison_Mcredit_Home_credit_Shinhang.png"
import banner3 from "../../../public/Images/BOX-TRAGOP-5-150624 (1).png"
export default function BannerHeader() {

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:'center',backgroundColor:"#fff897"}}>
      <div>
      <Image
          className="BuyInInstallments-Section1-bg1"
          src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/08/HEAD-TRAGOP-2024-1920-030824.png"
          alt=""
          width={1920}
          height={1080}/>
        <Image
          className="BuyInInstallments-Section1-bg2"
          src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/08/HEAD-TRAGOP-2024-900-030824.png"
          alt=""
          width={900}
          height={506}
                     />
      </div>
  
      <div className="BuyInInstallments-Section1-Container">
        <Image
          className="BuyInInstallments-S1-ImageBG"
          src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/06/BOX-TRAGOP-8-150624.png"
          alt=""
          width={1200}
          height={675}
                     />
        <Image
          src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/06/BOX-TRAGOP-1-150624.png"
          alt=""
          className="BuyInInstallments-S1-ImageBG"
          width={1200}
          height={675}
                     />
        <div className="wrapper-banner2">
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexDirection:"column",
            border:"1px solid #333",
            backgroundColor:"#fff"
          }}
        >
          <Image
            src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/06/BOX-TRAGOP-2-150624.png"
            alt=""
            width={1000}
            height={1000}
             className="bannerline1"
          />
            <Image
            src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/03/Banner_Kredivo_UuDaiTraGop_120010324.png"
            alt=""
            width={1000}
            height={1000}
            className="bannerline1"

          />
        </div>
      
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexDirection:"column",
            border:"1px solid #333",
            backgroundColor:"#fff"

          }}
        >
          <Image
            src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/06/BOX-TRAGOP-3-150624.png"
            className="bannerline2"

            alt=""
            width={1000}
            height={1000}
                         />
          <Image
            src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/06/BANNER-HOME-PAYLATER-1200-060624.png"
            alt=""
            width={1000}
            height={1000}
            className="bannerline2"

          />
        </div>

        </div>

        <Image
          src="https://bachlongmobile.com/bnews/wp-content/uploads/2024/06/BOX-TRAGOP-4-150624.png"
          alt=""
          className="BuyInInstallments-S1-ImageBG"
          width={1200}
          height={675}
        />
         <Image
          src={banner3}
          alt=""
          className="BuyInInstallments-S1-ImageBG"
          width={1200}
          height={675}
        />
        <div className="doublebanner">
          <Image
            src={banner1}
            alt=""
            className="BuyInInstallments-S1-Image"
            width={1200}
            height={675}
                      />
          <Image
            src={banner2}
            alt=""
            className="BuyInInstallments-S1-Image"
            width={1200}
            height={675}
            />
        </div>
      </div>
    </div>
  );
}

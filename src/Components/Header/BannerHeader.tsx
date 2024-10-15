"use client";
import Image from "next/image";
import React from "react";
import "../../Styles/styleheaderbanner.css";
import banner1 from "../../../public/Images/Gioi_thieu_BLM_1200x450_0810-3.jpg";
import banner2 from "../../../public/Images/BOX-TRAGOP-8-150624.png";
import banner3 from "../../../public/Images/tragop.png";
import banner4 from "../../../public/Images/BOX-TRAGOP-2-150624.png";
import banner5 from "../../../public/Images/Homepaylt.png";
import banner6 from "../../../public/Images/Banner_Kredivo_UuDaiTraGop_120010324.png";
import banner7 from "../../../public/Images/banner7.png";
import banner8 from "../../../public/Images/BOX-TRAGOP-4-150624.png";
import banner9 from "../../../public/Images/BOX-TRAGOP-5-150624 (1).png";
import banner10 from "../../../public/Images/1200x450__si_u_u_i_tr_g_p.png";
import banner11 from "../../../public/Images/banner11.png";

import Link from "next/link";
export default function BannerHeader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff897",
      }}
    >
      <div className="BuyInInstallments-Section1-Container">
        <div>
          <Image
            className="BuyInInstallments-Section1-bg1"
            src={banner1}
            alt=""
            width={1920}
            height={1080}
          />
          <Image
            className="BuyInInstallments-Section1-bg2"
            src={banner1}
            alt=""
            width={900}
            height={506}
          />
        </div>
        <Image
          className="BuyInInstallments-S1-ImageBG"
          src={banner2}
          alt=""
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
        <div className="wrapper-banner2">
          <Link href={`https://bachlongmobile.com/promotion/tra-gop-kredivo`}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexDirection: "column",
                border: "1px solid #333",
                backgroundColor: "#fff",
              }}
            >
              <Image
                src={banner4}
                alt=""
                width={1000}
                height={1000}
                className="bannerline1"
              />
              <Image
                src={banner6}
                alt=""
                width={1000}
                height={1000}
                className="bannerline1"
              />
            </div>
          </Link>
          <Link href={`https://bachlongmobile.com/promotion/home-pay-later`}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexDirection: "column",
                border: "1px solid #333",
                backgroundColor: "#fff",
              }}
            >
              <Image
                src={banner5}
                className="bannerline2"
                alt=""
                width={1000}
                height={1000}
              />
              <Image
                src={banner7}
                alt=""
                width={1000}
                height={1000}
                className="bannerline2"
              />
            </div>
          </Link>
        </div>

        <Image
          src={banner8}
          alt=""
          className="BuyInInstallments-S1-ImageBG"
          width={1200}
          height={675}
        />
        <Image
          src={banner9}
          alt=""
          className="BuyInInstallments-S1-ImageBG"
          width={1200}
          height={675}
        />
        <div className="doublebanner">
          <Link
            className="BuyInInstallments-S1-Image"
            href={`https://bachlongmobile.com/news/news/sieu-uu-dai-tra-gop-apple/`}
          >
            <Image src={banner10} alt="" width={1200} height={675} />
          </Link>
          <Link
            className="BuyInInstallments-S1-Image"
            href={`https://bachlongmobile.com/promotion/tra-gop-tai-chinh/`}
          >
            <Image src={banner11} alt="" width={1200} height={675} />
          </Link>
        </div>
      </div>
    </div>
  );
}

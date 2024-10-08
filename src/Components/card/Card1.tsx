import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "../../Styles/stylecard1.css"
export default function Card1(props: any) {
  const { installmentOptions } = props;
  return (
    <SwiperSlide
      className="bg-custom-gradient border border-slate-200 rounded-md px-2 pb-2"
    >
      <div className="swiper-slide bg-custom-gradient border">
        <div className="flex-column">
          <div className="flex-center">
            <div className="icon-container">
              <span className="icon-text">
                1
              </span>
            </div>
            <div className="details">
              <p className="info">
                <span className="text-sm">Tổng tiền trả góp</span>
                <span className="text-lg font-bold">
                  {"{"}data?.loan.toLocaleString("vi-VN"){"}"} VNĐ
                </span>
              </p>
              <span className="text-sm">
                Kỳ hạn {"{"}option.month{"}"}
              </span>
            </div>
          </div>
          <p className="info-line">
            <span className="text-sm">Giá trị đơn hàng</span>
            <span className="font-semibold">
              {"{"}productPrice.toLocaleString("vi-VN"){"}"} VNĐ
            </span>
          </p>
          <p className="info-line">
            <span className="text-sm">Giá trả góp</span>
            <span className="font-semibold">
              {"{"}data?.loan.toLocaleString("vi-VN"){"}"} VNĐ
            </span>
          </p>
          <p className="info-line">
            <span className="text-sm">Góp mỗi tháng</span>
            <span className="highlight">
              {"{"}Number(option.moneyofmonth).toLocaleString("vi-VN"){"}"} VNĐ
            </span>
          </p>
          <p className="info-line">
            <span className="text-sm">Chênh lệch trả thẳng</span>
            <span className="font-semibold">
              {"{"}Number(option.interest).toLocaleString("vi-VN"){"}"} VNĐ
            </span>
          </p>
          <p className="info-line">
            <span className="text-sm">Thanh toán khi nhận máy</span>
            <span className="font-semibold">
              {"{"}data?.loan.toLocaleString("vi-VN"){"}"} VNĐ
            </span>
          </p>
          <button className="select-button">Chọn</button>
        </div>
      </div>
    </SwiperSlide>
  );
}

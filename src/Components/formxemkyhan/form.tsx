"use client";
import { useEffect, useState } from "react";
import styles from "../../Styles/Home.module.css";
import Image from "next/image";
import { Input } from "antd";
import Card from "../card/Card";
import Card1 from "../card/Card1";

import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation } from "swiper/modules";

interface Card {
  cardCode: string;
  cardLogo: string;
  periods: {
    duration: number;
    monthly_installment: number;
    order_diffrence_amount: number;
    order_loan_amount: number;
    order_prepay_amount: number;
    order_total_amount: number;
    real_interest_rate: number;
    processing_fee: number;
    processing_fee_per_month: number;
  }[];
}

interface Bank {
  bankName: string;
  bankCode: string;
  bankLogo: string;
  cards: Card[]; // Định nghĩa chính xác kiểu dữ liệu cho cards
}
export default function Home() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [value,setValue] = useState("20000000");
  const [triggerSearch, setTriggerSearch] = useState(true); // Trạng thái để gọi API


  // Define GraphQL query and variables
  const query = `
    query GetInstallmentInfoByCredit(
        $loan_amount: Int,
        $total_amount: Int
    ) {
        getInstallmentInfoByCredit(loan_amount: $loan_amount, total_amount: $total_amount) {
            bankCode
            bankName
            bankLogo
            cards {
                cardCode
                cardLogo
                periods {
                    duration
                    monthly_installment
                    order_diffrence_amount
                    order_loan_amount
                    order_prepay_amount
                    order_total_amount
                    real_interest_rate
                    processing_fee
                    processing_fee_per_month
                }
            }
        }
    }
  `;

    const variables = {
      loan_amount:parseInt(value),
      total_amount: parseInt(value),  
    };
  // const variables = {
  //   loan_amount:0,
  //   total_amount: 0,  
  // };
  console.log("check variables",variables.loan_amount)
  // Fetch bank data via GraphQL
  // useEffect(() => {
  //   const fetchBanks = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://beta-api.bachlongmobile.com/graphql",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             query: query,
  //             variables: variables,
  //           }),
  //         }
  //       );

  //       const responseData = await response.json();
  //       if (responseData.data && responseData.data.getInstallmentInfoByCredit) {
  //         const bankData = responseData.data.getInstallmentInfoByCredit;
  //         setBanks(bankData); // Assuming bankData contains the correct array of banks
  //       } else {
  //         console.error("No data returned from API");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching bank data:", error);
  //     }
  //   };

  //   fetchBanks();
  // }, [variables]);
  // useEffect(() => {
  //   const fetchBanks = async () => {
  //     if (triggerSearch) {
  //       try {
  //         const response = await fetch(
  //           "https://beta-api.bachlongmobile.com/graphql",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               query: query,
  //               variables: variables,
  //             }),
  //           }
  //         );

  //         const responseData = await response.json();
  //         if (
  //           responseData.data &&
  //           responseData.data.getInstallmentInfoByCredit
  //         ) {
  //           const bankData = responseData.data.getInstallmentInfoByCredit;
  //           setBanks(bankData);
  //         } else {
  //           console.error("No data returned from API");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching bank data:", error);
  //       }
  //       setTriggerSearch(false); // Đặt lại trạng thái để không gọi lại API nữa
      
  //     }
  //   };
    
  //   fetchBanks();
  // }, [triggerSearch, variables]); // Gọi lại API khi `triggerSearch` thay đổi
  
  useEffect(() => {
    const fetchBanks = async () => {
      if (triggerSearch) {
        try {
          const response = await fetch(
            "https://beta-api.bachlongmobile.com/graphql",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: query,
                variables: variables,
              }),
            }
          );

          const responseData = await response.json();
          if (
            responseData.data &&
            responseData.data.getInstallmentInfoByCredit
          ) {
            const bankData = responseData.data.getInstallmentInfoByCredit;
            setBanks(bankData);

            // Tự động chọn bank và card đầu tiên sau khi nhận dữ liệu
            if (bankData.length > 0) {
              setSelectedBank(bankData[0]); // Chọn bank đầu tiên
              if (bankData[0].cards.length > 0) {
                setSelectedCard(bankData[0].cards[0]); // Chọn card đầu tiên của bank đầu tiên
              }
            }
          } else {
            console.error("No data returned from API");
          }
        } catch (error) {
          console.error("Error fetching bank data:", error);
        }
        setTriggerSearch(false); // Đặt lại trạng thái để không gọi lại API nữa
      }
    };

    fetchBanks();
  }, [triggerSearch, variables]); // Gọi lại API khi `triggerSearch` thay đổi


  
  console.log(banks);
  const handleSearch = () => {
    if (value) {
      setTriggerSearch(true); // Đặt trigger để gọi API
    } else {
      alert("Vui lòng điền số tiền muốn vay");
    }
  };

  // Handle selecting a bank
  const handleBankSelection = (bank: any) => {
    setSelectedBank(bank);
    setSelectedCard(null); // Reset card selection when a new bank is selected
  };

  // Handle selecting a card type
  const handleCardSelection = (card: any) => {
    setSelectedCard(card);
  };
  console.log("check bank", banks);
  console.log("check select bank", selectedBank);
  console.log("check card", selectedCard?.periods);
  console.log(selectedBank);
  console.log("check value input",value)
  return (
    <div style={{ textAlign: "center", backgroundColor: "#fff897" }}>
      <h1 style={{ fontSize: 40, padding: 20 }}> BẢNG TRẢ GÓP THAM KHẢO</h1>

      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            gap: 10,
          }}
        >
          <Input placeholder="điền số tiền bạn muốn vay" onChange={(e)=>setValue(e.target.value)}/>
          <button
            style={{
              backgroundColor: "#333",
              padding: 5,
              borderRadius: 10,
              color: "white",
            }}
            onClick={handleSearch} // Gọi hàm handleSearch khi nhấn nút

          >
            Search
          </button>
        </div>

        <div className={styles.grid}>
          {banks?.map((bank: any, index: any) => (
            <div
              key={index}
              className={`${styles.bankCard} ${
                selectedBank && selectedBank.bankCode === bank.bankCode
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleBankSelection(bank)}
            >
              <Image
                src={bank.bankLogo}
                alt={bank.bankName}
                className={styles.bankLogo}
                height={200}
                width={200}
              />
              {/* <p>{bank.bankName}</p> */}
            </div>
          ))}
        </div>

        {/* Chỉ hiển thị các lựa chọn thẻ thanh toán nếu đã chọn ngân hàng */}
        {selectedBank && (
          <div className={styles.paymentOptions}>
            <p>Chọn loại thẻ thanh toán cho {selectedBank?.bankName}:</p>
            <div className={styles.sub}>
              {selectedBank?.cards?.map((card: any, index: number) => (
                // Đừng quên trả về phần tử JSX từ hàm map
                <div className={styles.Imageboder} key={index}>
                  <Image
                    key={index}
                    src={card.cardLogo} // Đường dẫn logo của thẻ (từ API)
                    alt={card.cardCode}
                    className={styles.cardLogo}
                    width={100}
                    height={100}
                    onClick={() => handleCardSelection(card)} // Xử lý khi người dùng chọn thẻ
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedCard && (
          <div className="container" style={{ marginTop: 20 }}>
            <h2 style={{padding:20,fontSize:20,fontWeight:"bold"}}>Chọn 1 trong {selectedCard.periods.length} gói tham khảo</h2>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              slidesPerView={2.2}
              spaceBetween={12}
              style={{display:"flex"}}
            >
              {selectedCard?.periods.map((item: any, index: number) => (
                <SwiperSlide key={index} style={{display:"flex !important"}}>
                  <Card data={item} index={index} priceorigin={variables.total_amount}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          // <Swiper slidesPerView={2.2} spaceBetween={12} className="mySwiper">
          //   {selectedCard?.periods.map((item: any, index: number) => (
          //     <SwiperSlide
          //       key={index}
          //       style={{ display: "flex !important" }}
          //       className="slide-container"
          //     >
          //       <div className="flex-column">
          //         <div className="flex-center">
          //           <div className="index-box">
          //             <span className="index-text">
          //               {index + 1}
          //             </span>
          //           </div>
          //           <div className="details">
          //             <p className="info">
          //               <span className="text-sm">Tổng tiền trả góp</span>
          //               <span className="text-lg font-bold">
          //                 {data?.loan.toLocaleString("vi-VN")} VNĐ
          //               </span>
          //             </p>
          //             <span className="text-sm">
          //               Kỳ hạn {"{"}option.month{"}"}
          //             </span>
          //           </div>
          //         </div>
          //         <p className="info-line">
          //           <span className="text-sm">Giá trị đơn hàng</span>
          //           <span className="font-semibold">
          //             {"{"}productPrice.toLocaleString("vi-VN"){"}"} VNĐ
          //           </span>
          //         </p>
          //         <p className="info-line">
          //           <span className="text-sm">Giá trả góp</span>
          //           <span className="font-semibold">
          //             {"{"}data?.loan.toLocaleString("vi-VN"){"}"} VNĐ
          //           </span>
          //         </p>
          //         <p className="info-line">
          //           <span className="text-sm">Góp mỗi tháng</span>
          //           <span className="highlight">
          //             {"{"}Number(option.moneyofmonth).toLocaleString("vi-VN")
          //             {"}"} VNĐ
          //           </span>
          //         </p>
          //         <p className="info-line">
          //           <span className="text-sm">Chênh lệch trả thẳng</span>
          //           <span className="font-semibold">
          //             {"{"}Number(option.interest).toLocaleString("vi-VN"){"}"}{" "}
          //             VNĐ
          //           </span>
          //         </p>
          //         <p className="info-line">
          //           <span className="text-sm">Thanh toán khi nhận máy</span>
          //           <span className="font-semibold">
          //             {"{"}data?.loan.toLocaleString("vi-VN"){"}"} VNĐ
          //           </span>
          //         </p>
          //         <button className="select-button">Chọn</button>
          //       </div>
          //     </SwiperSlide>
          //   ))}
          // </Swiper>
        )}
      </div>
    </div>
  );
}

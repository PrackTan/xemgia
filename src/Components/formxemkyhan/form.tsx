"use client";
import React, { useEffect, useState } from "react";
import styles from "../../Styles/Home.module.css";
import Image from "next/image";
import { Input, Spin } from "antd";
import Card from "../card/Card";
import Card1 from "../card/Card1";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation } from "swiper/modules";
import kredivo from "../../../public/Images/kredivo-logo-freelogovectors.net_.png";
import mudeee from "../../../public/Images/muadee_payment.webp";
import shinhan from "../../../public/Images/shinhan.webp";
import mcredit from "../../../public/Images/1.png";
import hdsaigon from "../../../public/Images/hd-saison.webp";
import homecredit from "../../../public/Images/homecredit.png";

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
interface Bank1 {
  bankName: string;
  bankCode: string;
  bankLogo: string;
  endpoint: string;
  price: number; // Định nghĩa chính xác kiểu dữ liệu cho cards
}
export default function Home() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [banks2, setBanks2] = useState<Bank[]>([]);
  const [banks3, setBanks3] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedBank2, setSelectedBank2] = useState<Bank | null>(null);
  const [selectedBank3, setSelectedBank3] = useState<Bank1 | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [value, setValue] = useState("20000000");
  const [displayValue, setDisplayValue] = useState(""); // Giá trị hiển thị (có dấu chấm)
  const [triggerSearch, setTriggerSearch] = useState(true); // Trạng thái để gọi API
  const [loading, setLoading] = useState(false);

  const data = [
    {
      bankCode: "kredivopayment",
      bankLogo: kredivo,
    },
    {
      bankCode: "muadee_payment",
      bankLogo: mudeee,
    },
  ];
  const data1 = [
    {
      bankCode: "shinhan",
      bankLogo: shinhan,
      endpoint: "shinhan",
      price: parseInt(value),
      cost: 0,
    },
    {
      bankCode: "mcredit",
      bankLogo: mcredit,
      endpoint: "mcredit",
      price: parseInt(value),
      cost: 0,
    },
    {
      bankCode: "homecredit",
      bankLogo: homecredit,
      endpoint: "homecredit",
      price: parseInt(value),
      cost: 0,
    },
    {
      bankCode: "hdsg",
      bankLogo: hdsaigon,
      endpoint: "hdsg",
      price: parseInt(value),
      cost: 0,
    },
  ];
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
    loan_amount: parseInt(value),
    total_amount: parseInt(value),
  };
  const query2 = `
query GetInstallmentInfo(
  $loan_amount: Int,
  $total_amount: Int,
  $payment_method_code: String
) {
  getInstallmentInfo(
      loan_amount: $loan_amount
      total_amount: $total_amount
      payment_method_code: $payment_method_code
  ) {
      duration 
      monthly_installment 
      order_diffrence_amount
      order_loan_amount 
      order_prepay_amount 
      order_total_amount 
      real_interest_rate 
      processing_fee_per_month 
      processing_fee
   }
} 
`;
  const variable2 = {
    loan_amount: parseInt(value),
    payment_method_code: selectedBank2?.bankCode,
    total_amount: parseInt(value),
  };
  console.log("check variables", variables.loan_amount);

  useEffect(() => {
    const fetchBanks = async () => {
      if (triggerSearch) {
        setLoading(true);
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
          console.log("check respons1 ", responseData);
          setLoading(false);
          if (
            responseData.data &&
            responseData.data.getInstallmentInfoByCredit
          ) {
            const bankData = responseData.data.getInstallmentInfoByCredit;
            setBanks(bankData);

            // Tự động chọn bank và card đầu tiên sau khi nhận dữ liệu
            // if (bankData.length > 0) {
            //   setSelectedBank(bankData[0]); // Chọn bank đầu tiên
            //   if (bankData[0].cards.length > 0) {
            //     setSelectedCard(bankData[0].cards[0]); // Chọn card đầu tiên của bank đầu tiên
            //   }
            // }
        //   } else {
        //     console.error("No data returned from API");
          }
        } catch (error) {
          console.error("Error fetching bank data:", error);
          setLoading(false);
        }
        setTriggerSearch(false); // Đặt lại trạng thái để không gọi lại API nữa
      }
    };

    fetchBanks();
  }, [triggerSearch, variables]); // Gọi lại API khi `triggerSearch` thay đổi

  useEffect(() => {
    const fetchBanks2 = async () => {
      if (triggerSearch) {
        setLoading(true);
        try {
          const response = await fetch(
            "https://beta-api.bachlongmobile.com/graphql",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: query2,
                variables: variable2,
              }),
            }
          );

          const responseData = await response.json();
          console.log("check response 2", responseData);
          setLoading(false);
          const bankData = responseData.data.getInstallmentInfo;
          setBanks2(bankData);
          //    if (responseData.data && responseData.data) {
          //   const bankData = responseData.data.getInstallmentInfo;
          //   setBanks2(bankData);
          //   // Tự động chọn bank và card đầu tiên sau khi nhận dữ liệu
          //   if (bankData.length > 0) {
          //     setSelectedBank2(bankData[0]); // Chọn bank đầu tiên
          //   }
          // } else {
          //   console.error('No data returned from API');
          // }
          //   // Bạn có thể setBanks2 hoặc xử lý dữ liệu sau khi gọi API
        } catch (error) {
          console.error("Error fetching bank data:", error);
          setLoading(false);
        }
        setTriggerSearch(false); // Reset lại triggerSearch2 sau khi gọi API
      }
    };

    fetchBanks2();
  }, [triggerSearch, variable2]); // Gọi lại API khi triggerSearch2 thay đổi
  console.log("check banks2 ?>>>>>>>>>>>>>>>>>>>", banks2);

  useEffect(() => {
    const fetchBank3 = async () => {
      if (triggerSearch) {
        setLoading(true);

        try {
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxhuz9VahdzgRylHAa_Q20uaMx_bHWbPUBCw6jgHohyhQP0gHE9IBZCe3i2JZfUWWbQ/exec",
            {
              method: "POST",
              body: JSON.stringify({
                endpoint: selectedBank3?.endpoint,
                price: selectedBank3?.price,
                cost: 0,
              }),
            }
          );
          const responseData = await response.json();
          console.log("check response 3", responseData);
          //   setLoading(false);
          const bankData = responseData;
          setBanks3(bankData);
        } catch (error) {
          console.error("Error fetching bank data:", error);
          setLoading(false);
        }finally{
			setLoading(false);

		}
        setTriggerSearch(false); // Reset lại triggerSearch2 sau khi gọi API
      }
    };
    fetchBank3();
  }, [triggerSearch,selectedBank3?.endpoint, selectedBank3?.price]);

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
    console.log("check bank", bank);
    setSelectedCard(null); // Reset card selection when a new bank is selected
  };

  const handleBankSelection2 = (bank2: any) => {
	setSelectedBank2(bank2);
	setSelectedBank3(null); // Khi chọn bank2, ẩn bank3
    console.log("check bank2 name", selectedBank2);
  };
  // console.log("check bank2",banks2.bankCode);
  // Handle selecting a card type
  const handleBankSelection3 = (bank3: any) => {
	setSelectedBank3(bank3);
	setSelectedBank2(null); // Khi chọn bank3, ẩn bank2
    console.log("check bank3 name", bank3);
  };
  const handleCardSelection = (card: any) => {
    setSelectedCard(card);
    console.log("check card1 ", card);
  };

  const formatNumber = (value: any) => {
    // Loại bỏ dấu chấm trong số nhập vào
    let rawValue = value.replace(/\./g, "");

    // Cập nhật giá trị thực
    setValue(rawValue);

    // Định dạng lại số với dấu chấm (thêm dấu chấm vào mỗi 3 chữ số)
    let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Cập nhật giá trị hiển thị
    setDisplayValue(formattedValue);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Gọi hàm formatNumber để định dạng và lưu giá trị
    formatNumber(value);
  };
  // console.log('check bank', banks);
  // console.log('check select bank', selectedBank);
  // console.log('check card', selectedCard?.periods);
  // console.log(selectedBank);
  // console.log('check value input', value);
  console.log("check select bank3", selectedBank3);
  const [activeButton, setActiveButton] = useState<number>(1);
  console.log("check bank2 name" + banks2);
  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };
  console.log("check select bank2", selectedBank2);
  console.log("check bank3", banks3);
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
          <Input
            placeholder="điền số tiền bạn muốn vay"
            value={displayValue}
            onChange={handleInputChange}
          />
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
        <div className={`${"tabs_wrapper"}`}>
          <button
            className={`${"tab_item"} ${"button"}`}
            onClick={() => handleButtonClick(1)}
            style={{
              margin: 20,
              border: "1px solid #333",
              padding: 20,
              borderRadius: 10,
              backgroundColor: activeButton === 1 ? "black" : "white",
              color: activeButton === 1 ? "white" : "black",
            }}
          >
            Trả góp qua thẻ tín dụng
          </button>
          <button
            className={`${"tab_item"} ${"button"}`}
            onClick={() => handleButtonClick(2)}
            style={{
              margin: 20,
              border: "1px solid #333",
              padding: 20,
              borderRadius: 10,
              backgroundColor: activeButton === 2 ? "black" : "white",
              color: activeButton === 2 ? "white" : "black",
            }}
          >
            Trả góp qua công ty tài chính
          </button>
        </div>
        {activeButton === 1 && (
          <Spin spinning={loading} tip="Loading...">
            <div>
              <div className={styles.grid}>
                {banks?.map((bank: any, index: any) => (
                  <div
                    key={index}
                    className={`${styles.bankCard} ${selectedBank && selectedBank.bankCode === bank.bankCode ? styles.selectedBox : ""}`}
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
                      <div className={`${styles.Imageboder} ${
						selectedCard && selectedCard.cardCode === card.cardCode
						  ? styles.selectedBox
						  : ""
					  }`} key={index}>
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
                  <h2 style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
                    Chọn 1 trong {selectedCard.periods.length} gói tham khảo
                  </h2>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    slidesPerView={2.2}
                    spaceBetween={12}
                    style={{ display: "flex" }}
                  >
                    {selectedCard?.periods.map((item: any, index: number) => (
                      <SwiperSlide
                        key={index}
                        style={{ display: "flex !important" }}
                      >
                        <Card
                          data={item}
                          index={index}
                          priceorigin={variables.total_amount}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </Spin>
        )}

        {activeButton === 2 && (
          <Spin spinning={loading} tip="Loading...">
            <div>
              <span>Chọn loại thẻ thanh toán:</span>
              <div className={styles.grid}>
                {data?.map((bank2: any, index: any) => (
                  <div
                    key={index}
                    className={`${styles.bankCard} ${selectedBank2 && selectedBank2.bankCode === bank2.bankCode ? styles.selectedBox : ""}`}
                    onClick={() => handleBankSelection2(bank2)}
                  >
                    <Image
                      src={bank2.bankLogo}
                      alt={bank2.bankName}
                      className={styles.bankLogo}
                      height={200}
                      width={200}
                    />
                    {/* <p>{bank.bankName}</p> */}
                  </div>
                ))}
              </div>
              <span>Chọn công ty tài chính:</span>
              <div className={styles.grid}>
                {data1?.map((bank3: any, index: any) => (
                  <div
                    key={index}
                    className={`${styles.bankCard} ${selectedBank3 && selectedBank3.bankCode === bank3.bankCode ? styles.selectedBox : ""}`}
                    onClick={() => handleBankSelection3(bank3)}
                  >
                    <Image
                      src={bank3.bankLogo}
                      alt={bank3.bankName}
                      className={styles.bankLogo}
                      height={200}
                      width={200}
                    />
                    {/* <p>{bank.bankName}</p> */}
                  </div>
                ))}
              </div>
              {selectedBank3 === null && banks2 && (
                <div className="container" style={{ marginTop: 20 }}>
                  <h2 style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
                    Chọn 1 trong {banks2?.length} gói tham khảo
                  </h2>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    slidesPerView={2.2}
                    spaceBetween={12}
                    style={{ display: "flex" }}
                  >
                    {banks2?.map((item: any, index: number) => (
                      <SwiperSlide
                        key={index}
                        style={{ display: "flex !important" }}
                      >
                        <Card
                          data={item}
                          index={index}
                          priceorigin={variables.total_amount}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
			    {selectedBank2 === null && banks3 && banks3.item && (
                <div className="container" style={{ marginTop: 20 }}>
                  <h2 style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
                    Chọn 1 trong {banks3.item.length} gói tham khảo
                  </h2>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    slidesPerView={2.2}
                    spaceBetween={12}
                    style={{ display: "flex" }}
                  >
                    {banks3.item.map((item: any, index: number) => (
                      <SwiperSlide
                        key={index}
                        style={{ display: "flex !important" }}
                      >
                        <Card1
                          data={item}
                          index={index}
                          priceorigin={variables.total_amount}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </Spin>
        )}
      </div>
    </div>
  );
}

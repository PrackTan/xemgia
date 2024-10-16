"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../Styles/Home.module.css";
import Image from "next/image";
import { Input, Spin } from "antd";
import Card from "../card/Card";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Tour } from "antd";
import type { TourProps } from "antd";
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
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const [openIntro, setOpenIntro] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [banks2, setBanks2] = useState<Bank[]>([]);
  const [banks3, setBanks3] = useState<any>(null);
  const [data1, setData1] = useState([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedBank2, setSelectedBank2] = useState<Bank | null>(null);
  const [selectedBank3, setSelectedBank3] = useState<Bank1 | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showFinancialCompanies, setShowFinancialCompanies] = useState(false); // Trạng thái hiển thị công ty tài chính
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
    {
      bankCode: "test",
      bankLogo: "",
      bankLogo1: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <span className={styles.money}>$</span>
          <span style={{ marginLeft: 1, color: "#000", fontWeight: "600" }}>
            Công ty tài chính
          </span>
        </div>
      ),
      bank: [
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
      ],
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
    test: triggerSearch,
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
          if (
            responseData.data &&
            responseData.data.getInstallmentInfoByCredit
          ) {
            const bankData = responseData.data.getInstallmentInfoByCredit;
            setBanks(bankData);
            if (!selectedCard) {
              setLoading(true);
            }
            // Set default bank and card
            if (bankData.length > 0) {
              setSelectedBank(bankData[2]); // Set the first bank as default
              // if (bankData[0].cards.length > 0) {
              //   setSelectedCard(bankData[0].cards[0]); // Set the first card as default
              // }
            }
          }
        } catch (error) {
          console.error("Error fetching bank data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBanks();
  }, [triggerSearch, variable2]);
  console.log("check data bankkkkkk", banks);
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
          if (responseData.data && responseData.data) {
            const bankData = responseData.data.getInstallmentInfo;
            setBanks2(bankData);
            console.log(">>>>>>>>>>>>>BANK 2 ", banks2);
          }
        } catch (error) {
          console.error("Error fetching bank data:", error);
        } finally {
          setLoading(false);
        }
        setTriggerSearch(false);
      }
    };

    fetchBanks2();
  }, [variable2, selectedBank2, triggerSearch]);

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
          const bankData = responseData;
          setBanks3(bankData);
        } catch (error) {
          console.error("Error fetching bank data:", error);
        } finally {
          setLoading(false);
        }
        setTriggerSearch(false);
      }
    };
    fetchBank3();
  }, [triggerSearch, selectedBank3?.endpoint, selectedBank3?.price]);

  console.log("check selectcard?????????????????????", selectedCard);
  const handleSearch = async () => {
    if (value) {
      setTriggerSearch(true);
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
              variables: {
                loan_amount: parseInt(value),
                total_amount: parseInt(value),
              },
            }),
          }
        );

        const responseData = await response.json();
        if (responseData.data && responseData.data.getInstallmentInfoByCredit) {
          const bankData = responseData.data.getInstallmentInfoByCredit;
          setBanks(bankData);

          // Nếu đã có selectedBank và selectedCard, cập nhật chúng
          if (selectedBank && selectedCard) {
            const updatedBank = bankData.find(
              (bank: Bank) => bank.bankCode === selectedBank.bankCode
            );
            if (updatedBank) {
              setSelectedBank(updatedBank);
              const updatedCard = updatedBank.cards.find(
                (card: Card) => card.cardCode === selectedCard.cardCode
              );
              if (updatedCard) {
                setSelectedCard(updatedCard);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching updated data:", error);
      } finally {
        setLoading(false);
        setTriggerSearch(false);
      }
    } else {
      alert("Vui lòng điền số tiền muốn vay");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  // Handle selecting a bank
  const handleBankSelection = (bank: any) => {
    setSelectedBank(bank);
    setSelectedCard(null); // Reset card selection when a new bank is selected
    // setTriggerSearch(true);
  };
  const handleCardSelection = (card: any) => {
    setSelectedCard(card);
    console.log("check card1", card);
  };
  const handleBankSelection2 = (bank2: any) => {
    setSelectedBank2(bank2);
    setSelectedBank3(null); // Khi chọn bank2, ẩn bank3
    // Nếu chọn mục "Công ty tài chính" thì hiển thị các công ty tài chính
    if (bank2.bankCode === "test") {
      setShowFinancialCompanies(true);
      setData1(bank2.bank); // Hiển thị danh sách các công ty tài chính từ data
    } else {
      setShowFinancialCompanies(false); // Ẩn danh sách công ty tài chính
      setBanks2([]);
    }
  };
  const handleBankSelection3 = (bank3: any) => {
    setSelectedBank3(bank3);
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

  const [activeButton, setActiveButton] = useState<number>(1);
  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
    if (buttonId === 2) {
      setShowFinancialCompanies(false);
      setSelectedBank2(null);
      setSelectedBank3(null);
    }
  };
  // console.log("check bank1", banks);
  // console.log("check bank2" + banks2);
  // console.log("check bank3", banks3);
  // console.log("check select bank2", selectedBank2);
  // console.log("check select bank3", selectedBank3);
  const steps: TourProps["steps"] = [
    {
      title: "Bước 1",
      description: "Chọn loại bạn muốn trả góp.",
      target: () => ref1.current,
      nextButtonProps: { children: "Tiếp theo" },
    },
    {
      title: "Bước 2",
      description: "Chọn ngân hàng bạn muốn.",
      target: () => ref2.current,
      prevButtonProps: { children: "Quay lại" },
      nextButtonProps: { children: "Tiếp theo" },
    },
    {
      title: "Bước 3",
      description: "Chọn loại thẻ bạn muốn.",
      target: () => ref3.current,
      prevButtonProps: { children: "Quay lại" },

      nextButtonProps: { children: "Tiếp theo" },
    },
    {
      title: "Bước 4",
      description: "Nhấp số tiền bạn muốn vay",
      target: () => ref4.current,
      prevButtonProps: { children: "Quay lại" },
      nextButtonProps: { children: "Tiếp theo" },
    },
    {
      title: "Bước 5",
      description: "Nhấn nút này để tham khảo.",
      target: () => ref5.current,
      prevButtonProps: { children: "Quay lại" },
      nextButtonProps: { children: "Hoàn thành" },
    },
  ];
  return (
    <div style={{ textAlign: "center", backgroundColor: "#fff897" }}>
      <h1 className={styles.title}> BẢNG TRẢ GÓP THAM KHẢO</h1>

      <div className={styles.container}>
        <button className={styles.btn_huongdan} onClick={() => setOpen(true)}>
          Hướng dẫn sử dụng
        </button>
        <div className={`${"tabs_wrapper"}`} ref={ref1}>
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
              <div className={styles.grid} ref={ref2}>
                {banks?.map((bank: any, index: any) => (
                  <div
                    key={index}
                    className={`${styles.bankCard} ${
                      selectedBank && selectedBank.bankCode === bank.bankCode
                        ? styles.selectedBox
                        : ""
                    }`}
                    onClick={() => handleBankSelection(bank)}
                  >
                    <Image
                      src={bank?.bankLogo}
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
                <div className={styles.paymentOptions} ref={ref3}>
                  <p style={{ color: "#000" }}>
                    Chọn loại thẻ thanh toán cho {selectedBank?.bankName}:
                  </p>
                  <div className={styles.sub}>
                    {selectedBank?.cards?.map((card: any, index: number) => (
                      // Đừng quên trả về phần tử JSX từ hàm map
                      <div
                        className={`${styles.Imageboder} ${
                          selectedCard &&
                          selectedCard.cardCode === card.cardCode
                            ? styles.selectedBox
                            : ""
                        }`}
                        key={index}
                      >
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                  gap: 10,
                }}
              >
                <input
                  ref={ref4}
                  className={styles.inputMoney}
                  value={displayValue}
                  placeholder="Điền số tiền bạn muốn vay"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress} // Lắng nghe sự kiện phím Enter
                />
                <button
                  ref={ref5}
                  style={{
                    backgroundColor: "#333",
                    padding: 15,
                    borderRadius: 10,
                    color: "white",
                  }}
                  onClick={handleSearch}
                >
                  Tham khảo trả góp
                </button>
              </div>
              {/* <Spin spinning={loading} tip="Loading..."> */}
              {!loading && selectedCard && (
                <div className="container" style={{ marginTop: 20 }}>
                  <h2
                    style={{
                      padding: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    Chọn 1 trong {selectedCard.periods.length} gói tham khảo
                  </h2>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    slidesPerView="auto"
                    breakpoints={{
                      640: {
                        slidesPerView: 1.5,
                        spaceBetween: 15,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                      },
                      1024: {
                        slidesPerView: 2.2,
                        spaceBetween: 15,
                      },
                    }}
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
              {/* </Spin> */}
            </div>
          </Spin>
        )}
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />

        {activeButton === 2 && (
          <Spin spinning={loading} tip="Loading...">
            <div>
              <span style={{ color: "#000" }}>Chọn loại thẻ thanh toán:</span>
              <div className={styles.grid}>
                {data?.map((bank2: any, index: any) => (
                  <div
                    key={index}
                    className={`${styles.bankCard} ${
                      selectedBank2 && selectedBank2.bankCode === bank2.bankCode
                        ? styles.selectedBox
                        : ""
                    }`}
                    onClick={() => handleBankSelection2(bank2)}
                  >
                    {bank2.bankLogo ? (
                      <Image
                        src={bank2?.bankLogo}
                        alt={bank2.bankName}
                        className={styles.bankLogo}
                        height={200}
                        width={200}
                      />
                    ) : (
                      bank2.bankLogo1
                    )}

                    {/* <p>{bank.bankName}</p> */}
                  </div>
                ))}
              </div>
              {showFinancialCompanies && (
                <>
                  <span>Chọn công ty tài chính:</span>
                  <div className={styles.grid}>
                    {data1.map((bank3: any, index: any) => (
                      <div
                        key={index}
                        className={`${styles.bankCard} ${
                          selectedBank3 &&
                          selectedBank3.bankCode === bank3.bankCode
                            ? styles.selectedBox
                            : ""
                        }`}
                        onClick={() => handleBankSelection3(bank3)}
                      >
                        <Image
                          src={bank3.bankLogo}
                          alt={bank3.bankName}
                          className={styles.bankLogo}
                          height={200}
                          width={200}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                  gap: 10,
                }}
              >
                <input
                  className={styles.inputMoney}
                  value={displayValue}
                  placeholder="Điền số tiền bạn muốn vay"
                  onKeyDown={handleKeyPress} // Lắng nghe sự kiện phím Enter
                  onChange={handleInputChange}
                />
                <button
                  style={{
                    backgroundColor: "#333",
                    padding: 15,
                    borderRadius: 10,
                    color: "white",
                  }}
                  onClick={handleSearch}
                >
                  Tham khảo trả góp
                </button>
              </div>
              {selectedBank3 === null && banks2 && (
                <div style={{ marginTop: 20 }}>
                  <h2
                    style={{
                      padding: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    Chọn 1 trong {banks2?.length} gói tham khảo
                  </h2>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    style={{ display: "flex" }}
                    breakpoints={{
                      640: {
                        slidesPerView: 1.5,
                        spaceBetween: 15,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                      },
                      1024: {
                        slidesPerView: 2.2,
                        spaceBetween: 15,
                      },
                    }}
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

              {banks3 && banks3.item && (
                <div style={{ marginTop: 20 }}>
                  <h2
                    style={{
                      padding: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    Chọn 1 trong {banks3.item.length} gói tham khảo
                  </h2>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    style={{ display: "flex" }}
                    breakpoints={{
                      640: {
                        slidesPerView: 1.5,
                        spaceBetween: 15,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                      },
                      1024: {
                        slidesPerView: 2.2,
                        spaceBetween: 15,
                      },
                    }}
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
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </div>
    </div>
  );
}

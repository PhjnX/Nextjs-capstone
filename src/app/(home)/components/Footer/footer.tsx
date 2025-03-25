"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import FacebookScript from "./FacebookScript";

function Footer() {
  const onChange = (value: string | null) => {
    console.log("Captcha value:", value);
  };

  return (
    <footer className="bg-slate-900 rounded-lg shadow-sm dark:bg-gray-900  flex justify-center mt-5 w-full">
      <FacebookScript />
      <div className="w-1/3 text-white mx-2 space-y-3">
        <div>
          <img
            src="./logo-footer.png"
            alt="logo-footer"
            className="w-full h-[200px]"
          />
          <p>
            IT Learning với những khóa học cơ bản dễ tiếp cận với người mới học
            và trái ngành. Đào tạo chuyên sâu với cái dự án thực tế
          </p>
        </div>
        <div className="space-y-2">
          <h3 className=" font-bold">NHẬN TIN SỰ KIỆN VÀ KHUYẾN MÃI</h3>
          <p>
            IT Learning gửi các bạn các khóa học trực tuyến và chương trình
            Cyberlive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp dẫn
            đến các bạn.
          </p>
          <div>
            <input
              type="email"
              placeholder="address@gmail.com"
              className="rounded-md mx-3"
            />
            <button
              type="button"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Đăng ký
            </button>
          </div>
          <div className="flex space-x-2">
            <FontAwesomeIcon
              icon={faLocationDot}
              color="grey"
              width={20}
              height={20}
            />
            <span className="text-white">Cơ sở 1: Cao Thắng, Q.10, TP.HCM</span>
          </div>
          <div className="flex space-x-2">
            <FontAwesomeIcon
              icon={faLocationDot}
              color="grey"
              width={20}
              height={20}
            />
            <span className="text-white">
              Cơ sở 2: Điện Biên Phủ, Q.Bình Thạnh, TP.HCM
            </span>
          </div>
          <div className="flex space-x-2">
            <FontAwesomeIcon
              icon={faLocationDot}
              color="grey"
              width={20}
              height={20}
            />
            <span className="text-white">
              Cơ sở 3: Khu Công Nghệ Cao, TP. Thủ Đức, TP.HCM
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/3 text-white m-2 space-y-3 flex flex-col">
        <h3 className="font-bold text-2xl">ĐĂNG KÝ TƯ VẤN</h3>
        <input type="text" placeholder="Họ và tên *" />
        <input type="email" placeholder="Email liên hệ *" />
        <input type="number" placeholder="Điện thoại liên hệ *" />
        <h4 className="font-bold">
          Nhấn vào ô bên dưới <span className="text-red-600">*</span>
        </h4>
        <ReCAPTCHA
          sitekey="6LcTQekqAAAAAHYtZ9Sd0YD7eVjWNHGsDLb0qBQQ"
          onChange={onChange}
        />
        <button
          type="button"
          className="w-1/3 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Đăng ký tư vấn
        </button>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
          aliquid esse mollitia voluptate provident quae officia, ab reiciendis
          eum cupiditate corporis ipsa illo. Eveniet iusto error voluptas cum
          ipsam rem officia! Incidunt tenetur laboriosam debitis ipsa possimus
          quo tempore necessitatibus, doloribus ratione facilis temporibus
          obcaecati quaerat impedit quis non expedita.
        </p>
      </div>
      <div className="w-1/3 m-2 flex justify-center">
        <div
          className="fb-page"
          data-href="https://www.facebook.com/lophocviet"
          data-tabs="timeline"
          data-width="340"
          data-height="500"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/lophocviet"
            className="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/lophocviet">
              CyberSoft - Đào Tạo Chuyên Gia Lập Trình
            </a>
          </blockquote>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

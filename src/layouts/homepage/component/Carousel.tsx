import React, { useEffect } from 'react';
import WOW from 'wowjs';
import 'animate.css/animate.min.css';
// import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import '../../../assets/lib/owlcarousel/assets/owl.theme.default.min.css'
import '../../../assets/lib/owlcarousel/assets/owl.carousel.css'

const Carousel: React.FC = () => {
    useEffect(() => {
        // Khởi tạo WOW.js khi component được render
        const wow = new WOW.WOW({
            live: false, // Tắt chế độ tự động quét liên tục (giảm hiệu năng)
        });
        wow.init();  // Kích hoạt WOW.js để các animation chạy khi scroll vào

        return () => {
            // Xóa WOW.js nếu cần khi component unmount
        };
    }, []);  // Chạy một lần khi component mount

    return (
        <div className="container-fluid p-0">
            <h2>aaaaaa</h2>
            <div className="owl-carousel header-carousel position-relative">
                <div className="owl-carousel-item position-relative wow slideInLeft" data-wow-delay="0.5s">
                    <img className="img-fluid" src="lib/img/carousel-1.jpg" alt="" />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(43, 57, 64, .5)' }}>
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-10 col-lg-8">
                                    <h1 className="display-3 text-white animated slideInDown mb-4">
                                        Find The Perfect Job That You Deserved
                                    </h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-2">
                                        Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.
                                    </p>
                                    <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                                        Search A Job
                                    </a>
                                    <a href="" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">
                                        Find A Talent
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="owl-carousel-item position-relative wow fadeInUp">
                    <img className="img-fluid" src="lib/img/carousel-2.jpg" alt="" />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(43, 57, 64, .5)' }}>
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-10 col-lg-8">
                                    <h1 className="display-3 text-white animated slideInDown mb-4">
                                        Find The Best Startup Job That Fit You
                                    </h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-2">
                                        Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.
                                    </p>
                                    <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                                        Search A Job
                                    </a>
                                    <a href="" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">
                                        Find A Talent
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;

import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Cards from '../../components/Cards';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
const SampleNextArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick}>
			NEXT
		</div>
	);
};

const SamplePrevArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick}>
			BACK
		</div>
	);
};
const SpecialDishes = () => {
	const [recipes, setRecipes] = useState([]);
	const slider = React.useRef(null); // kấy giá trị của một input hoặc thực hiện các hành động khác
	useEffect(() => {
		fetch('/menu.json')
			.then((res) => res.json())
			.then((data) => {
				const specails = data.filter((item) => item.category === 'popular');
				setRecipes(specails);
			});
	}, []); // Chạy chỉ một lần sau khi component được render

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
					infinite: true,
					dots: true,
				},
			},
		],
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div className="section-container my-20 relative">
			<div>
				<div className="text-left">
					<p className="subtitle">Special Favorites</p>
					<h2 className="title md:w-[520px]">Standout Dishes From Our Menu</h2>
				</div>
				{/* arrow btn */}
				<div className="md:absolute right-3 top-8 mb-10 md:mr-24">
					<button onClick={() => slider?.current?.slickPrev()} className="btn p-2 rounded-full ml-5">
						<FaAngleLeft className="h-8 w-8 p-1" />
					</button>
					<button onClick={() => slider?.current?.slickNext()} className="btn p-2 rounded-full ml-5 bg-green">
						<FaAngleRight className="h-8 w-8 p-1" />
					</button>
				</div>
				<Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
					{recipes.map((item, i) => (
						<Cards item={item} key={i} />
					))}
				</Slider>
			</div>
		</div>
	);
};

export default SpecialDishes;

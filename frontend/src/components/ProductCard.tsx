// import { useRouter } from "next/router";
import heart_icon from '../assets/heart_icon.svg';
import star_icon from '../assets/star_icon.svg';
import star_dull_icon from '../assets/star_dull_icon.svg';

const ProductCard = ({ product }) => {

    // const router = useRouter();
    const currency = "NT$";

    return (
        <div
            // onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            // className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-contain w-4/5 h-4/5 md:w-full md:h-full"
                    width={500}
                    height={500}
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <img
                        className="h-3 w-3"
                        src={heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <img
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? star_icon
                                    : star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard
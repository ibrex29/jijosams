import Image from "next/image";
import { FaRegClock } from "react-icons/fa";

const articles = [
  {
    volume: "181, issue 1, 2025",
    title:
      "Ultra-Compact Photonic Isolator Based on Bias-Free Magneto-Optical Thin Films",
    authors:
      "Gianni Portela, Yisheng Ni, Kotaro Sato, Yuya Shoji and Hugo Enrique Hernandez-Figueroa",
    date: "2025-02-16",
  },
  {
    volume: "181, issue 1, 2025",
    title:
      "Lymph Node Diagnosis for Colorectal Cancer by Utilizing a Hyperspectral Laparoscope and Machine Learning",
    authors:
      "Changwei Jiao, Miaoliang Chen, Zehai Li, Jinbo Chen, Jiaqi Liao, Ruili Zhang and Sailing He",
    date: "2025-02-07",
  },
  {
    volume: "181, issue 1, 2025",
    title:
      "Emergence of Diffractive Phenomena in Finite Arrays of Subwavelength Scatterers (Invited Paper)",
    authors:
      "Ilya Igorevich Karavaev, Ravshanjan Nazarov, Yicheng Li, Andrey A. Bogdanov and Denis G. Baranov",
    date: "2025-02-07",
  },
  {
    volume: "181, issue 1, 2025",
    title: "High Harmonic Generation in Integrated Nonlinear Platforms",
    authors: "Yuhua Li, Shao Hao Wang, Brent E. Little and Sai Tak Chu",
    date: "2025-01-22",
  },
  {
    volume: "181, issue 1, 2025",
    title:
      "Wideband High Gain Lens Antenna Based on Deep Learning Assisted Near-Zero Refractive Index Metamaterial",
    authors:
      "Huanran Qiu, Liang Fang, Rui Xi, Yajie Mu, Dexiao Xia, Yuanhao Zhang, Shiyun Ma, Jiaqi Han, Qiang Feng, Ying Li, Hong Xu, Bin Zheng and Long Li",
    date: "2025-01-09",
  },
];

const LatestArticles = () => {
  return (
    <div className="flex justify-center p-4 px-6 lg:px-16">
      <div className="max-w-5xl bg-gray-50 p-4 ">
        {/* Header Section */}
        <div className="flex border-l-4 border-primary justify-between pl-2 items-center  pb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Latest Articles{" "}
            <span className="text-gray-600">› Vol.182 in progress</span>
          </h2>
          <button className="border border-gray-400 px-4 py-2 text-sm rounded-md hover:bg-gray-200">
            View All Manuscript
          </button>
        </div>

        {/* Articles List */}
        <div className="mt-6 ">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border-t-2 border-primary"
            >
              <Image
                className="my-1"
                src={"/logo/slu_jst_logo.svg"}
                alt="slu-jst"
                width={120}
                height={15}
              />
              <div className="text-sm text-gray-600">Vol. {article.volume}</div>
              <h3 className="text-lg font-semibold text-gray-800 hover:text-red-500 cursor-pointer mt-1">
                {article.title}
              </h3>
              <p className="text-sm text-gray-700 mt-1">{article.authors}</p>
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <FaRegClock className="mr-1" />
                {article.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;

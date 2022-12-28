import { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default function Home() {
  const [navbar, setNavbar] = useState(false);
  const { height } = useWindowDimensions();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const changeBackground = () => {
    if (window.scrollY >= 68) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener('scroll', changeBackground);

    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  });

  return (
    <>
      <header
        className={`py-2 sticky top-0 z-20 backdrop-blur-3xl  ${
          navbar ? '' : 'bg-black'
        } `}
      >
        <div className="wrapper">
          <div className="flex items-center justify-between">
            <div
              onClick={scrollToTop}
              className="flex gap-2 items-center cursor-pointer font-bold hover:text-blue-600 transition-all"
            >
              <img src="./logo.png" alt="logo" className="w-10 h-10" />
              <p className="hidden sm:block text-4xl">Nice Stom Tech</p>
              <p className="sm:hidden text-4xl">NST</p>
            </div>
            <div className="flex">
              <nav className="max-[768px]:hidden">
                <ul className="flex items-center gap-6">
                  <li>
                    <AnchorLink
                      className="block py-3 px-2 text-white hover:text-blue-600 transition-all capitalize text-lg"
                      href="#services"
                    >
                      услуги
                    </AnchorLink>
                  </li>
                  <li>
                    <AnchorLink
                      className="block py-3 px-2 text-white hover:text-blue-600 transition-all capitalize text-lg"
                      href="#experience"
                    >
                      опыт
                    </AnchorLink>
                  </li>
                  <li>
                    <AnchorLink
                      className="block py-3 px-2 text-white hover:text-blue-600 transition-all capitalize text-lg"
                      href="#contacts"
                    >
                      контакты
                    </AnchorLink>
                  </li>
                </ul>
              </nav>
              <select name="lang" id="lang" className=" ml-6 text-black">
                <option value="ru">ru</option>
                <option value="uz">uz</option>
                <option value="en">en</option>
              </select>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section id="main">
          <div className="wrapper">
            <div
              className="main"
              style={{ height: `calc(${height}px - 68px)` }}
            >
              <h2 className="font-normal text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center leading-tight">
                Зуботехническая лаборатория{' '}
                <span className="text-blue-600">
                  &quot;Nice Stom Tech&quot;
                </span>{' '}
                предлагает компьютерное фрезерование на{' '}
                <span className="text-blue-600">CAD/CAM</span> любых конструкций
              </h2>
              <AnchorLink
                href="#services"
                className="animate-bounce bg-zinc-900 p-4 xl:p-6 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </AnchorLink>
            </div>
          </div>
        </section>
        <section id="services">
          <div className="wrapper">
            <div className="pt-14 pb-12 md:pt-18 md:pb-16 lg:pt-22 lg:pb-20 xl:pt-28 xl:pb-24">
              <h3 className="title">Наши услуги</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-5">
                <div className="relative w-full py-5 px-10 rounded-2xl overflow-hidden transition-all">
                  <h4 className="text-center text-2xl mb-5">
                    Индивидуальные абатманты:
                  </h4>
                  <ul>
                    <li className="text-lg">Металлические из титана</li>
                    <li className="text-lg">Из диоксида циркония</li>
                    <li className="text-lg">Из e.max литийдисиликата</li>
                  </ul>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
                <div className="relative w-full py-5 px-10 rounded-2xl overflow-hidden transition-all">
                  <h4 className="text-center text-2xl mb-5">
                    Литейные услуги:
                  </h4>
                  <ul>
                    <li className="text-lg">культевые штифты</li>
                    <li className="text-lg">каркасы для металло-керамики</li>
                    <li className="text-lg">бюгельные каркасы</li>
                    <li className="text-lg">промежутки</li>
                  </ul>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
                <div className="relative w-full py-5 px-10 rounded-2xl overflow-hidden transition-all">
                  <h4 className="text-center text-2xl mb-5">
                    Виниры и вкладки:
                  </h4>
                  <ul>
                    <li className="text-lg">из e.max литийдисиликата</li>
                    <li className="text-lg">из диоксида циркония</li>
                  </ul>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
                <div className="relative w-full py-5 px-10 rounded-2xl overflow-hidden transition-all">
                  <h4 className="text-center text-2xl mb-5">
                    Керамические коронки с нанесением:
                  </h4>
                  <ul>
                    <li className="text-lg">на металлические конструкции</li>
                    <li className="text-lg">на диоксид циркония</li>
                    <li className="text-lg">на литийдисиликата</li>
                    <li className="text-lg">из e.max литийдисиликата</li>
                  </ul>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
                <div className="relative w-full py-5 px-10 rounded-2xl overflow-hidden transition-all">
                  <h4 className="text-center text-2xl mb-5">
                    Полные анатомические коронки:
                  </h4>
                  <ul>
                    <li className="text-lg">из e.max дисиликата лития</li>
                    <li className="text-lg">из диоксида циркония</li>
                    <li className="text-lg">из металла (CoCr)</li>
                  </ul>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
                <div className="relative w-full py-5 px-10 rounded-2xl overflow-hidden transition-all">
                  <h4 className="text-center text-2xl mb-5">
                    Бюгельные протезы:
                  </h4>
                  <ul>
                    <li className="text-lg">PEEK пластик титан</li>
                    <li className="text-lg">Металлический CoCr</li>
                    <li className="text-lg">Биодентапласт</li>
                  </ul>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="experience">
          <div className="wrapper">
            <div className="pt-14 pb-12 md:pt-18 md:pb-16 lg:pt-22 lg:pb-20 xl:pt-28 xl:pb-24">
              <h3 className="title">Отраслевой опыт</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-3 lg:gap-4 xl:gap-5">
                <div className="relative overflow-hidden w-full p-5 xl:p-8 rounded-2xl transition-all">
                  <h5 className="text-center text-7xl xl:text-9xl font-black mb-2 xl:mb-6">
                    7+
                  </h5>
                  <p className="text-center text-xl xl:text-4xl">Лет опыта</p>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
                <div className="relative overflow-hidden w-full p-5 xl:p-8 rounded-2xl transition-all">
                  <h5 className="text-center text-7xl xl:text-9xl font-black mb-2 xl:mb-6">
                    10+
                  </h5>
                  <p className="text-center text-xl xl:text-4xl">Сотрудники</p>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
                <div className="relative overflow-hidden w-full p-5 xl:p-8 rounded-2xl transition-all md:col-span-2 lg:col-auto">
                  <h5 className="text-center text-7xl xl:text-9xl font-black mb-2 xl:mb-6">
                    12+
                  </h5>
                  <p className="text-center text-xl xl:text-4xl">
                    Клиник доверяют нам
                  </p>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contacts">
          <div className="wrapper">
            <div className="pt-14 pb-12 md:pt-18 md:pb-16 lg:pt-22 lg:pb-20 xl:pt-28 xl:pb-24">
              <h3 className="title">Наши контакты</h3>
              <div className="mb-8 flex flex-col gap-3 lg:gap-5 lg:flex-row justify-between items-center">
                <a
                  href="tel:998970012602"
                  className="flex gap-2 lg:gap-4 items-center text-center text-xl lg:text-2xl hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <span>+998 (97) 001-26-02</span>
                </a>
                <a
                  href="https://yandex.uz/maps/-/CCUrUIvPCC"
                  target="_blank"
                  className="flex gap-2 lg:gap-4 items-center text-center text-xl lg:text-2xl hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span>Ташкент, Карасарайская улица 3</span>
                </a>
                <a
                  href="mailto:info@nicestomtech.uz"
                  className="flex gap-2 lg:gap-4 items-center text-center text-xl lg:text-2xl hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span>info@nicestomtech.uz</span>
                </a>
              </div>
              <div className="relative overflow-hidden w-full rounded-2xl transition-all">
                <div className="relative overflow-hidden">
                  <a
                    href="https://yandex.uz/maps/org/146632874605/?utm_medium=mapframe&utm_source=maps"
                    className="absolute top-0 text-xs text-[#eee]"
                  >
                    Dental Clinik
                  </a>
                  <a
                    href="https://yandex.uz/maps/10335/tashkent/category/dental_clinics/184106132/?utm_medium=mapframe&utm_source=maps"
                    className="absolute top-[14px] text-xs text-[#eee]"
                  >
                    Стоматологическая клиника в Ташкенте
                  </a>
                  <iframe
                    src="https://yandex.uz/map-widget/v1/-/CCUryEeRGD"
                    className="relative w-full aspect-square md:aspect-[3/2] lg:aspect-[3/1]"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-zinc-900 text-zinc-600">
        <div className="wrapper py-5 flex items-center justify-between max-[450px]:flex-col">
          <p>&#169; All rights reserved. 2022-2023</p>
          <p>
            Made by{' '}
            <a
              className="hover:text-zinc-500"
              href="https://t.me/umidullo"
              target="_blank"
            >
              @umidullo
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

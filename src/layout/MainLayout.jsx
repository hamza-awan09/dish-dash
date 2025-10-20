import Header from '../component/Header'
export default function MainLayout({ children }) {
    return (
        <>
            <Header />
            <div className="py-8">
                <div className="mx-[20px] md:mx-[32px] lg:mx-auto lg:w-[960px] xl:w-[1140px] 2xl:w-[1450px]">
                    {children}
                </div>
            </div>
        </>
    );
}
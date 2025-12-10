import { Assets } from "../../assets/assets";

const CTA = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around text-sm rounded-md m-2 my-10 w-full bg-slate-800/30">
      <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
        <h2 className="md:text-4xl text-2xl font-semibold text-slate-100">
          Descarga la aplicación Mobile
        </h2>
        <p className="text-gray-400 mt-2 w-3/4">
          EleCommerce app para iOS & Android para administrar tus compras online.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button
            aria-label="googlePlayBtn"
            className="active:scale-95 transition-all"
            type="button"
          >
            <img
              className="md:w-44 w-28"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtn.svg"
              alt="googlePlayBtn"
            />
          </button>
          <button
            aria-label="appleStoreBtn"
            className="active:scale-95 transition-all"
            type="button"
          >
            <img
              className="md:w-44 w-28"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtn.svg"
              alt="appleStoreBtn"
            />
          </button>
        </div>
      </div>

      <img
        className="max-w-[375px] pt-10 md:p-0"
        src={Assets.Women}
        alt="excitedWomenImage"
      />
    </div>
  );
};

export default CTA;

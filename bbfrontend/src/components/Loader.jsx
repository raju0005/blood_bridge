const Loader = () => {
  return (
    <div class="relative w-20 h-28 mask-drop bg-gray-200">
      <div class="absolute bottom-0 w-[200%] h-[200%]  animate-rise">
        <svg
          viewBox="0 0 1440 320"
          class="absolute bottom-0 w-full h-40 animate-wave text-red-600 fill-current"
        >
          <path
            fill="currentColor"
            d="M0,224L60,213.3C120,203,240,181,360,165.3C480,149,600,139,720,160C840,181,960,235,1080,250.7C1200,267,1320,245,1380,234.7L1440,224V320H0Z"
          ></path>
        </svg>
      </div>{" "}
    </div>
  );
};
export default Loader;

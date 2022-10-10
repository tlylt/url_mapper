type LoadingSpinnerProps = {
  shouldShow: boolean;
};
const LoadingSpinner = ({ shouldShow }: LoadingSpinnerProps) => {
  return shouldShow ? (
    <div className="mx-auto h-screen w-20 pt-10">
      <img src="/spinner.png" className="animate-wiggle" alt="spinner"></img>
    </div>
  ) : null;
};

export default LoadingSpinner;

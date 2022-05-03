const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "from-orange-300 to-orange-500"
          : "from-green-300 to-green-400"
      } bg-gradient-to-r p-3 text-center rounded-xl font-bold text-white`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;

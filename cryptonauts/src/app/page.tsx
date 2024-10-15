import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <img src="nasabg.jpg" className="sm:h-full h-[400px] w-full mt-16"/>
      
      <div className="h-full w-full sm:py-32 py-16 bg-primary-700 text-white flex flex-col">
       <div className="sm:flex text-sm sm:text-base px-8">
       <img src="nasabgc.jpg" className="sm:w-[450px] w-[320px] mb-16 sm:mb-0 sm:h-[320px] mx-auto"/>
        <div className="flex flex-col mx-auto">
        
        <p className=" text-xl font-bold mb-8 sm:mb-0 text-center sm:text-start">Esse projeto visiona parceria com a nasa.</p>
        
        <div className="pl-6 sm:pl-0">
        
          <p className="">Todos seus sonhos alcançados em uma grande navegação.</p>
          <p className="">E tudo isso com outra enorme revolução, falamos de blockchain e nasa.</p>
          <p className="">Como as criptos moedas vem se tornando valorizadas,<br/> por que não experimenta-las em preparações amplificadas?</p>
          <p className="">Conheça então CryptoNautsCoin a moeda de um novo mundo.</p>
          <p className="">Você pode se registrar na lista de navegadores com essa moeda.<br/>
          Para se registrar é nescessário pagar uma quantidade de CryptoNautsCoin.</p>
          <p className="">Mas não para por ai, pode ser feito compras de recursos armazenados</p>
          <p className="">Como alimentos, bebidas e bens matériais.</p>

        </div>
        
        
        </div>
       
       
       </div>
       
      </div>
      
      
      
    </div>
  );
}

import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function SiteLogo({ definition }: { definition: boolean }) {
  return (
    <div>
    {
     definition ?
     <img
  style={{
    height: "100%",
    width: "100%",
   
  }}
  src="/logo.svg"
  alt="Author Image"
/>

     :
      <img className='w-[60%] md:w-[100%]'
              src="/logo.svg"
              alt="Author Image"  
      />
  
    }
    </div>
    
  );
}

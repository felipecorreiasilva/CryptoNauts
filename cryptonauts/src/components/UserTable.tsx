import { useAuth } from "@/context/AuthContext";
import { ethers } from "ethers";
import { DecodedError, ErrorDecoder } from "ethers-decode-error";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { Trash2 } from "lucide-react";

interface InterfaceNauts {
  nauts: any[]
}

type FormEditType = {
  
  newUsername: string,
  newRole: string,
  newEmail: string,

}

const CryptoNautsCoin = require("@/contracts/CryptoNautsCoin.json");
const CryptoNauts = require("@/contracts/CryptoNauts.json");
const ABI = [CryptoNautsCoin.abi, CryptoNauts.abi];
const addressCNCoin = String(process.env.ADDRESS_CNCOIN);
const addressCNauts = String(process.env.ADDRESS_CNAUTS);

const UserTable = ({ nauts }: InterfaceNauts) => {

  const { connectWallet, account } = useAuth();

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [selectedModalDelete, setSelectedModalDelete] = useState<any>(null);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [selectedModalEdit, setSelectedModalEdit] = useState<any>(null);
  const [formEditData, setFormEditData] = useState<FormEditType>({
    newUsername: '',
    newRole: '',
    newEmail: '',
  })
  const selectRole = ['Informe seu papel','Pilot','Captain','Engineer','Member'];

  const expandModalDelete = (id:number,project:any) => {
    const data = {
      id,
      email: project[0],
      name: project[1],
      role: project[2],
    }
    setSelectedModalDelete(data);
    setOpenModalDelete(true);
  }
  
  const closeModalDelete = () => {
    setSelectedModalDelete(null);
    setOpenModalDelete(false);
  }

  const expandModalEdit = (id:number,project:any) => {
    const data = {
      id,
      email: project[0],
      name: project[1],
      role: project[2],
    }
    setSelectedModalEdit(data);
    setOpenModalEdit(true);
  }
  
  const closeModalEdit = () => {
    setSelectedModalEdit(null);
    setOpenModalEdit(false);
  }

  const handleOnChange = (e:any)=> {

    e.preventDefault()

    switch(e.target.name){
    
      default:
        const newObj = {...formEditData,[e.target.name]:e.target.value}
        setFormEditData(newObj)
        break
        
    }
 
  }

  

  const handleEditNauts = async (id: number,e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('id: ',id)
    const { provider, signer } = await connectWallet();
    const contractCNauts = new ethers.Contract(addressCNauts, ABI[1], signer);
    await contractCNauts.waitForDeployment();
    const nonce = await signer.getNonce();

    const gasPrice = (await provider.getFeeData()).gasPrice;
    const gasLimit = 5000000;

    let options = {
      gasPrice,
      gasLimit,
      nonce,
    }

    let rawTransaction = await signer.signTransaction(options);
    console.log("rawTransaction", rawTransaction)
    const {newEmail,newUsername,newRole} = formEditData;

    contractCNauts.updateNauts(id,newEmail,newUsername,newRole).then(async(updateNauts:any)=>{
        console.log(updateNauts)
        let _response = await updateNauts.wait();
        console.log('_response', _response)
        toast.success(`Navegante atualizado com sucesso`)
    }).catch (async(error:any) =>{

    const errorDecoder = ErrorDecoder.create()
    const decodedError: DecodedError = await errorDecoder.decode(error)
    toast.error(`${(decodedError.reason)}`)
    console.log(error)

    })

  }

  const handleDeleteNauts = async (id: number,e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('id: ',id)
    const { provider, signer } = await connectWallet();
    const contractCNauts = new ethers.Contract(addressCNauts, ABI[1], signer);
    await contractCNauts.waitForDeployment();
    const nonce = await signer.getNonce();

    const gasPrice = (await provider.getFeeData()).gasPrice;
    const gasLimit = 5000000;

    let options = {
      gasPrice,
      gasLimit,
      nonce,
    }

    let rawTransaction = await signer.signTransaction(options);
    console.log("rawTransaction", rawTransaction)
    contractCNauts.deleteNauts(id).then(async (deleteNauts: any) => {
      console.log(deleteNauts)
      let _response = await deleteNauts.wait();
      console.log('_response', deleteNauts)
      console.log('_response', _response)
      toast.success(`Navegante deletado com sucesso`)
    }).catch(async (error: any) => {

      const errorDecoder = ErrorDecoder.create()
      const decodedError: DecodedError = await errorDecoder.decode(error)
      toast.error(`${(decodedError.reason)}`)
      console.log(error)

    })
  }

  return (
    <div className="w-[256px] lg:w-[1024px] lg:mx-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Id</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Email</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Role</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Edit</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody>
          {nauts && nauts.length > 0 ? (
            nauts.map((naut: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{i}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{naut.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{naut.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{naut.role}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300"><FaUserEdit onClick={() => expandModalEdit(i,naut)} size={16} className="cursor-pointer ml-2 text-blue-600" />
                <Modal open={openModalEdit} onClose={closeModalEdit}>
                    <div className="text-center mx-auto ">

                      <FaUserEdit size={56} className="mx-auto mt-12 mb-4 text-blue-600" />
                      <div className="mx-auto my-4">
                        <h3 className="text-lg font-black text-white mb-8">Atualizar</h3>
                        <form>
                      <div className="flex flex-col space-y-4 w-[80%] mx-auto">
                      

                <label className="relative">
                  
                  <input 
                  required
                  name='newUsername'
                  placeholder='Digite seu nome completo' 
                  className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-white border rounded-md outline-none 
                  focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                  value={formEditData.newUsername}
                  onChange={handleOnChange}
                  type="text" />
                  <p className='text-white absolute
                  peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[6px] ml-2 px-2 duration-300 bg-primary-900 peer-valid:text-sm peer-valid:-translate-y-5'>
                  Nome
                  <span 
                  className='text-red-500 ml-1'>
                  *</span>
                  </p>
                  
                  
                </label>

                <label className="relative">
                  
                  <input 
                  required
                  name='newEmail'
                  placeholder='Digite seu endereço de email' 
                  className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-white border rounded-md outline-none 
                  focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                  value={formEditData.newEmail}
                  onChange={handleOnChange}
                  type="email" />
                  <p className='text-white absolute
                  peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[6px] ml-2 px-2 duration-300 bg-primary-900 peer-valid:text-sm peer-valid:-translate-y-5'>
                  Endereço de email
                  <span 
                  className='text-red-500 ml-1'>
                  *</span>
                  </p>
                  
                </label>

                <label className="relative">
                  
                  <select 
                  required
                  name='newRole' 
                  className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-white focus:text-neutral-500 border rounded-md outline-none 
                  focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                  value={formEditData.newRole}
                  onChange={handleOnChange}
                  >
                    {
                        selectRole.map((role:string,i:number) => {
                            return <option key={i} className='' value={role}>{role}</option>
                        })
                    }
                  </select>
                  
                  <p className='text-white absolute
                  peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[6px] ml-2 px-2 duration-300 bg-primary-900 peer-valid:text-sm peer-valid:-translate-y-5'>
                  Papel
                  <span 
                  className='text-red-500 ml-1'>
                  *</span>
                  </p>
                  
                  
                </label>
                <p className="text-sm w-56 text-gray-500 mx-auto">
                          Você tem certeza que deseja atualizar o navegante {selectedModalEdit?.name} ?
                </p>
                      
                
                
                  <div className="flex gap-4 py-4">
                        
                    <button
                    onClick={closeModalEdit}
                    className="w-full border-2 text-gray-800 hover:text-white border-gray-800 hover:bg-gray-800 rounded-lg text-center p-[8px]">
                      Cancelar
                      </button>
                      <button 
                      type="submit"
                      onClick={(e:any) => handleEditNauts(i,e)} 
                      className="w-full border-2 text-blue-800 hover:text-white border-blue-800 hover:bg-blue-800 
                      rounded-lg text-center p-[8px]">Atualizar</button>
                      
                  </div>
    
                

                </div>
                
            </form>
                        
                      </div>
                      
                    </div>

                </Modal>
                </td>
                
                
                
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300"><Trash2 onClick={() => expandModalDelete(i,naut)} size={16} className="cursor-pointer ml-[12px] text-start text-red-600" />
                  
                  <Modal open={openModalDelete} onClose={closeModalDelete}>
                    <div className="text-center">

                      <Trash2 size={56} className="mx-auto mt-12 mb-4 text-red-600" />
                      <div className="mx-auto my-4 w-[80%]">
                        <h3 className="text-lg font-black text-white mb-8">Deletar</h3>
                        <p className="text-sm w-56 mx-auto text-gray-500">
                          Você tem certeza que deseja deletar o navegante? {selectedModalDelete?.name}
                        </p>
                      </div>
                      <div className="flex gap-4 w-[80%] mx-auto py-4">
                        
                        <button
                          onClick={closeModalDelete}
                          className="w-full border-2 text-gray-800 hover:text-white border-gray-800 hover:bg-gray-800 rounded-lg text-center p-[8px]">Cancelar</button>
                          <button onClick={(e:any) => handleDeleteNauts(selectedModalDelete.id,e)} className="w-full border-2 text-red-800 hover:text-white border-red-800 hover:bg-red-800 rounded-lg text-center p-[8px]">Deletar</button>
                      </div>
                    </div>

                  </Modal>

                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={6} className="text-center py-4">No nauts found</td></tr>
          )}
        </tbody>
      </table>

    </div>
  );
};
export default UserTable;
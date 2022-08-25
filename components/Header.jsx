import React from 'react'
import { MenuIcon, SearchIcon,QuestionMarkCircleIcon,MailIcon,BellIcon,HeartIcon, XIcon } from '@heroicons/react/outline';
import {signOut} from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {modalState} from '../atoms/ModalAtom';
import { useRecoilState } from 'recoil';
import { Transition } from '@headlessui/react';
import {useState} from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Header = ({user}) => {

    const router = useRouter();
    const [open,setOpen] = useRecoilState(modalState);
    const [openMenu,setOpenMenu] = useState(false);
    const [showbigMenu, setShowBigMenu] = useState(false);

    const signinOut = async () => {
        await signOut({callbackUrl:"/member/signup"});
    }

  return (
    <div className='z-10 bg-white'>
        <div className='py-[2px]'>
        <div className='flex flex-col header-breakpoint:justify-between border-b border-b-gray-200 py-2 header-breakpoint:flex-row '>
            <div className='flex items-center border-b border-b-gray-200 header-breakpoint:border-b-0  justify-between  py-2 px-4'>
                <img onClick={()=> router.push("/")} className=' w-[75px] cursor-pointer' src="/img/logo.png" alt='logo' />
                {user &&
                        <div className='header-breakpoint:hidden flex space-x-4 text-gray-400 items-center mr-2 flex-1 justify-end'>
                            <MailIcon onClick={()=> router.push('/inbox')}  className='w-6 cursor-pointer'/>
                            <BellIcon  className='w-6 cursor-pointer'/>
                            <HeartIcon onClick={()=> router.push('/member/items/favourite_list')}  className='w-6 cursor-pointer'/>
                        </div>
                    }
                <MenuIcon onClick={()=> setShowBigMenu(true)} className='text-gray-400 w-7 header-breakpoint:hidden cursor-pointer' />
                {
                    showbigMenu && <div className='absolute top-0 left-0 bottom-0 right-0 w-full bg-white  h-screen overflow-y-scroll'>
                    <p className='flex justify-end'>

                    <XIcon onClick={()=> setShowBigMenu(false)} className='w-10' />
                    </p>
                    <div className='p-6'>
                        <div className='flex flex-col'>
                            {user &&
                            <>
                                <button onClick={()=> router.push('/items/new')} className='bg-[#0e8c93] p-2 mb-2 rounded-md text-md text-white'>Vends tes articles</button>
                                <button className='rounded-md text-[#0e8c93] p-2 bg-white border border-[#0e8c93]'>Ton guide vinted</button>
                            </>
        
                            }
                            {
                                !user &&
                                <>
                                    <button onClick={()=> router.push('/member/signup')} className='bg-[#0e8c93] p-2 mb-2 rounded-md text-md text-white'>Vends tes articles</button>
                                    <button onClick={()=> setOpen(true)} className='rounded-md text-[#0e8c93] p-2 bg-white border border-[#0e8c93]'>S'inscrire | Se connecter</button>
                                </>
                            }
                            
                            <p className='text-sm mt-4 p-4'>Parcourir</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]'>Femme</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]'>Homme</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]'>Enfant</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]'>Maison</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]'>Divertissement</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]'>Animaux</p>

                            {user &&
                                <>
                                    <p className='text-sm mt-4 p-4'>Mon compte</p>
                                    <p onClick={()=> router.push("/member/profil")} className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Mon profil</p>
                                    <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Mes parametres</p>
                                    <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Personnalisation</p>
                                    <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Mon porte-monnaie</p>
                                    <p onClick={signinOut} className='text-md border-b border-b-gray-200 p-4 text-red-600' >Se deconnecter</p>
                                
                                </>
                            }



                            <p className='text-sm mt-4 p-4'>Decouvrir</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Comment ca marche</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Applications mobiles</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Centre d'aide</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Tableau de bord</p>
                            <p className='text-md border-b border-b-gray-200 p-4 text-[#0e8c93]' >Vinted pro</p>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div>
           
            </div>
            <div className='flex flex-1 header-breakpoint:mx-12 items-center bg-gray-200 px-2  mx-6 py-[6px] rounded-sm mt-2'>
               {/*  <select  className='outline-none bg-transparent' name="section-search" id="section-search">
                    <option className='bg-white' value="articles">Articles</option>
                    <option value="member">Membres</option>
                    <option value="forum">Forum</option>
                    <option value="help">Centre d'aide</option>
                </select> */}
                <SearchIcon className='text-gray-400 w-6' />
                <input className='bg-transparent outline-none' placeholder='Rechercher' />
            </div>

                <div className='hidden  header-breakpoint:flex header-breakpoint:items-center'>
                    {user &&
                        <div data-testid="menu" className='flex space-x-4 text-gray-400 items-center mr-2'>
                            <MailIcon   onClick={()=> router.push('/inbox')}  className='w-6 cursor-pointer'/>
                            <BellIcon  className='w-6 cursor-pointer'/>
                            <HeartIcon data-testid="heartIcon" onClick={()=> router.push('/member/items/favourite_list')}  className='w-6 cursor-pointer'/>
                            <span  onClick={()=> setOpenMenu((current)=>!current)}  className='ml-2 cursor-pointer'>
                                <Image className='w-10 rounded-full' src={user.image} width={32} height={32} />
                            </span>
                            
                        <button onClick={()=> router.push('/items/new')} className='text-white text-xs bg-[#0e8c93] p-[6px] rounded-md'>Vends tes articles</button>
                        

                        </div>
                        
                    }
                    { !user && <div data-testid="login-buttons">
                        <button onClick={()=> setOpen(true)}   className='flex-shrink-0 text-xs mr-2 py-1 px-2 rounded-md border text-[#0e8c93] border-[#0e8c93]'>S'inscrire | Se connecter </button>
                        <button  onClick={()=> router.push('/member/signup')} className='text-white text-xs flex-shrink-0 bg-[#0e8c93] p-[6px] rounded-md'>Vends maintenant</button>
                    </div>
                    }
                    <QuestionMarkCircleIcon className='w-6 text-gray-400' />


                    <ClickAwayListener onClickAway={()=> setOpenMenu(false)}>
                                <Transition
                                show={openMenu}
                                enter="transition-opacity duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
    
                                <div className="origin-top-right absolute right-28 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                    <a href="#" onClick={()=> router.push('/member/profil')} className="text-gray-700 block px-4 py-2 text-sm">Mon Profil</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm">Mes parametres</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" >Personnalisation</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" >Mon porte-monnaie 0,00 &euro;</a>
                                    <button  onClick={signinOut} className="text-gray-700 block w-full text-left px-4 py-2 text-sm" >Deconnexion</button>
                                    </div>
                                </div>
                        </Transition>
                </ClickAwayListener>

                </div>
        </div>
        <div className='hidden cursor-pointer mt-2 items-center space-x-4 text-gray-400 text-sm  mx-auto p-3 header-breakpoint:flex'>
            <p>Femme</p>
            <p>Homme</p>
            <p>Enfant</p>
            <p>Maison</p>
            <p>Divertissement</p>
            <p>Animaux</p>
            <p>A propos</p>
            <p>Notre plateforme</p>
        </div>
    </div>
    </div>
  )
}

export default Header
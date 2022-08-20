import React from 'react'
import { MenuIcon, SearchIcon,QuestionMarkCircleIcon,MailIcon,BellIcon,HeartIcon } from '@heroicons/react/outline';
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

    const test = () => {
        console.log("test");
        setOpen(true);
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
                <MenuIcon className='text-gray-400 w-7 header-breakpoint:hidden cursor-pointer' />
            </div>
            <div>
           
            </div>
            <div className='flex flex-1 header-breakpoint:mx-12 items-center bg-gray-200  px-2 py-[6px] rounded-sm mt-2'>
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
                        <button onClick={test}  className='flex-shrink-0 text-xs mr-2 py-1 px-2 rounded-md border text-[#0e8c93] border-[#0e8c93]'>S'inscrire | Se connecter </button>
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
                                    <a href="#" onClick={()=> router.push('/member/profil')} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Mon Profil</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Mes parametres</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Personnalisation</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Mon porte-monnaie 0,00 &euro;</a>
                                    <form method="POST" action="#" role="none">
                                        <button  onClick={()=> signOut({callbackUrl:"/"})}   type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Deconnexion</button>
                                    </form>
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
import React from "react";
import { FaBars } from "react-icons/fa";


const AdminSettings = ({menu, setMenu}) => {
  return (
    <div class='layout-content-container flex flex-col max-w-[960px] flex-1'>
      <div className='flex flex-wrap items-center  gap-2 p-2 px-0 md:p-4'>
        <div onClick={() => setMenu(!menu)} className='md:hidden'>
          <FaBars size={24} className='text-white' />
        </div>
        <p className='text-white text-2xl md:text-3xl font-bold leading-tight '>
          Settings
        </p>
      </div>
      <div class='pb-3'>
        <div class='flex border-b border-[#3e3a55] p-2 px-0 md:p-4 gap-8'>
          <a
            class='flex flex-col items-center justify-center border-b-[3px] border-b-white text-white pb-[13px] pt-4'
            href='#'
          >
            <p class='text-white text-sm font-bold leading-normal tracking-[0.015em]'>
              Store Settings
            </p>
          </a>
          <a
            class='flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#a09bbb] pb-[13px] pt-4'
            href='#'
          >
            <p class='text-[#a09bbb] text-sm font-bold leading-normal tracking-[0.015em]'>
              User Management
            </p>
          </a>
        </div>
      </div>
      <h3 class='text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4'>
        Store Information
      </h3>
      <div class='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
        <label class='flex flex-col min-w-40 flex-1'>
          <p class='text-white text-base font-medium leading-normal pb-2'>
            Store Name
          </p>
          <input
            class='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'
            value=''
          />
        </label>
      </div>
      <div class='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
        <label class='flex flex-col min-w-40 flex-1'>
          <p class='text-white text-base font-medium leading-normal pb-2'>
            Currency
          </p>
          <select class='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'>
            <option value='one'></option>
            <option value='two'>two</option>
            <option value='three'>three</option>
          </select>
        </label>
      </div>
      <h3 class='text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4'>
        Tax
      </h3>
      <div class='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
        <label class='flex flex-col min-w-40 flex-1'>
          <p class='text-white text-base font-medium leading-normal pb-2'>
            Tax Percentage
          </p>
          <input
            class='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'
            value=''
          />
        </label>
      </div>
      <h3 class='text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4'>
        Shipping
      </h3>
      <div class='flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3'>
        <label class='flex flex-col min-w-40 flex-1'>
          <p class='text-white text-base font-medium leading-normal pb-2'>
            Shipping Presets
          </p>
          <select class='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#2a273a] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#a09bbb] p-4 text-base font-normal leading-normal'>
            <option value='one'></option>
            <option value='two'>two</option>
            <option value='three'>three</option>
          </select>
        </label>
      </div>
      <h3 class='text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4'>
        Theme
      </h3>
      <div class='flex items-center gap-4 bg-[#121118] px-4 min-h-14 justify-between'>
        <p class='text-white text-base font-normal leading-normal flex-1 truncate'>
          Dark Mode
        </p>
        <div class='shrink-0'>
          <label class='relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#2a273a] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#2104af]'>
            <div class='h-full w-[27px] rounded-full bg-white'></div>
            <input type='checkbox' class='invisible absolute' />
          </label>
        </div>
      </div>
      <div class='flex px-4 py-3 justify-end'>
        <button class='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2104af] text-white text-sm font-bold leading-normal tracking-[0.015em]'>
          <span class='truncate'>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;

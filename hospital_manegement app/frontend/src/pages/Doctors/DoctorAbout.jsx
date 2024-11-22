import React from 'react'

// import { formateDate } from '../../utils/FormateDate'

const DoctorAbout = () => {
  return (
    <div>
      <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
      About of
      <span className='text-irisBlueColor font-bold text-[24px] leading-9' >
        DR.p.Chakrwarti
      </span>

      </h3>
      <p className="text_para">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, dolores quae illum perferendis suscipit, at autem exercitationem maxime voluptas aliquid ipsum. Harum provident dolorem accusamus qui corrupti numquam dolores deserunt.</p>
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education
        </h3>


        <ul className='pt-4 md:p-5'>
            <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>

                    <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                    {/* {formateDate("12-04-2010")} */} 28 june 2010
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                        B.sc. in medical
                    </p>
                </div>
               
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                    New Apollp Hospital, kolkata.
                </p>
            </li>
            <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>

                    <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                        {/* {formateDate("12-04-2010")} */}28 june 2010
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                        M.sc. in medical
                    </p>
                </div>
               
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                    New Apollp Hospital, kolkata.
                </p>
            </li>
        </ul>
      </div>
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Experience
        </h3>
        <ul className=' grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
            <li className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellowColor text-[15px] leading-6 font-semibold '>12 june 2010 to 13 june 2024</span>
                <p className='text-[15px] leading-6 font-medium text-textColor'>
                    S.Surgeon
                </p>
                <p className='text-[14px] leading-5 font-medium text-textColor'> New Apollo Hospital, Kollkata</p>
            </li>
            <li className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellowColor text-[15px] leading-6 font-semibold '>12 june 2010 to 13 june 2024</span>
                <p className='text-[15px] leading-6 font-medium text-textColor'>
                    S.Surgeon
                </p>
                <p className='text-[14px] leading-5 font-medium text-textColor'> New Apollo Hospital, Kollkata</p>
            </li>
        </ul>
        </div>
    </div>
  )
}

export default DoctorAbout


import React from 'react'

const Contact = () => {
  return (
   <section>
    <div className='px-4 mx-auto max-w-screen-md'>
      <h2 className='heading text-center '>Contact Us</h2>
      <p className='mb-8 lg:mb-16 font-light  text-center text_para'>
        Got a techincal issue? Want to send feedback about a beta feature? Let Us Know.
      </p>
      <form action="#" className='space-y-8'>
        <div>
          <label className='form_lable' htmlFor="">
      Your Email
          </label>
          <input type="email" 
          className='form_input mt-1'
          id='email'
          placeholder='example@gmail.com '
           />
        </div>
        <div>
          <label className='form_lable' htmlFor="Subject">
      Subject
          </label>
          <input type="email" 
          className='form_input mt-1'
          id='subject'
          placeholder='Let us know how can help you'
           />
        </div>
        <div className='sm:col-span-2'>
          <label className='form_lable' htmlFor="message">
      Your Message
          </label>
          <textarea name="" 
          rows="6"
          className='form_input mt-1'
          id='message'
          placeholder='Leave a comment...'
          >
          </textarea>
           
        </div>
        <button type='submit' className='btn rounded sm:min-w-fit p-4'>Submit</button>
      </form>

    </div>
   </section>
  )
}

export default Contact

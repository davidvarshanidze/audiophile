import React from 'react'

function Header() {
  return (
    <>
    <header>
        <div>
            <nav>
                <ul className='flex gap-4 flex justify-center py-14'>
                    <li><a href="#">HOME</a></li>
                    <li><a href="#">HEADPHONES</a></li>
                    <li><a href="#">SPEAKERS</a></li>
                    <li><a href="#">EARPHONES</a></li>
                </ul>
            </nav>
        </div>
    </header>
    </>
  )
}

export default Header
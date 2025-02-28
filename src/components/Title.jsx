function Title({text1 , text2}){
    return (
        <div className="flex gap-2 text-2xl items-center mb-2">
            <span className="text-white">{text1}</span>
            <span className="text-yellow-100">{text2}</span>
            <span className="w-8 bg-white h-1"></span>
        </div>
    )
}

export default Title;
interface CompassIconProps {
  size?: number
  className?: string
}

export function CompassIcon({ size = 64, className = "" }: CompassIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer ring */}
      <div 
        className="absolute inset-0 rounded-full border-2 border-gray-300 bg-white shadow-lg"
        style={{ width: size, height: size }}
      >
        {/* Inner ring */}
        <div 
          className="absolute rounded-full border border-gray-200 bg-gradient-to-br from-gray-50 to-white"
          style={{ 
            width: size - 8, 
            height: size - 8,
            top: 4,
            left: 4
          }}
        >
          {/* Center dot */}
          <div 
            className="absolute bg-red-500 rounded-full shadow-sm"
            style={{
              width: 4,
              height: 4,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          {/* North needle */}
          <div 
            className="absolute bg-red-500 shadow-sm origin-bottom"
            style={{
              width: 2,
              height: size * 0.25,
              top: size * 0.1,
              left: '50%',
              transform: 'translateX(-50%) rotate(15deg)',
              borderRadius: '1px 1px 0 0'
            }}
          />
          
          {/* South needle */}
          <div 
            className="absolute bg-gray-400 shadow-sm origin-top"
            style={{
              width: 2,
              height: size * 0.2,
              bottom: size * 0.1,
              left: '50%',
              transform: 'translateX(-50%) rotate(15deg)',
              borderRadius: '0 0 1px 1px'
            }}
          />
          
          {/* Cardinal directions */}
          <div 
            className="absolute text-gray-700 font-bold text-xs select-none"
            style={{
              top: 2,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: size * 0.15
            }}
          >
            N
          </div>
          <div 
            className="absolute text-gray-700 font-bold text-xs select-none"
            style={{
              bottom: 2,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: size * 0.15
            }}
          >
            S
          </div>
          <div 
            className="absolute text-gray-700 font-bold text-xs select-none"
            style={{
              top: '50%',
              left: 2,
              transform: 'translateY(-50%)',
              fontSize: size * 0.15
            }}
          >
            W
          </div>
          <div 
            className="absolute text-gray-700 font-bold text-xs select-none"
            style={{
              top: '50%',
              right: 2,
              transform: 'translateY(-50%)',
              fontSize: size * 0.15
            }}
          >
            E
          </div>
        </div>
      </div>
    </div>
  )
}

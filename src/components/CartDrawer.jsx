export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full md:w-[420px] h-full bg-[#0b0b0b] border-l border-white/10 p-6 overflow-y-auto">
        
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold tracking-wide">Your Cart</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>

       
        {cartItems.length === 0 ? (
          <p className="text-white/50">Cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="border border-white/10 rounded-2xl p-4 bg-white/[0.03]">
                <h3 className="text-lg mb-2">{item.productName}</h3>
                <p className="text-white/60 text-sm">Metal: {item.metal}</p>
                <p className="text-white/60 text-sm">Stone: {item.stone}</p>
                <p className="text-white/60 text-sm">Carat: {item.carat}</p>
                <p className="text-yellow-400 text-lg mt-3">${item.total}</p>
                
                <button
                  onClick={() => onRemoveItem(index)}
                  className="mt-4 text-xs uppercase tracking-[0.2em] text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
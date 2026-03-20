export default function OfferPage() {
  return (
    <div className="bg-dark text-parchment min-h-screen">

      {/* Контейнер как на сайте */}
      <div className="section-container pt-32 pb-20">

        {/* Заголовок справа */}
        <h1 className="font-serif text-5xl md:text-6xl text-right mb-16">
          Публичная <span className="text-gold">оферта</span>
        </h1>

        {/* Текст */}
        <div className="max-w-3xl text-sm md:text-base leading-relaxed space-y-6">

          <p>
            Настоящий документ является публичной офертой...
          </p>

          <h2 className="font-serif text-xl text-parchment">1. Общие положения</h2>
          <p>
            Настоящая оферта является официальным предложением заключить договор...
          </p>

          <h2 className="font-serif text-xl text-parchment">2. Предмет договора</h2>
          <p>
            Оказание услуг по оценке, покупке и реализации предметов искусства.
          </p>

          <h2 className="font-serif text-xl text-parchment">3. Права и обязанности</h2>
          <p>
            Клиент обязуется предоставить достоверную информацию...
          </p>

          <h2 className="font-serif text-xl text-parchment">4. Стоимость</h2>
          <p>
            Стоимость определяется индивидуально.
          </p>

          <h2 className="font-serif text-xl text-parchment">5. Ответственность</h2>
          <p>
            Стороны несут ответственность в соответствии с законодательством РФ.
          </p>

          <h2 className="font-serif text-xl text-parchment">6. Персональные данные</h2>
          <p>
            Отправляя данные, пользователь соглашается на их обработку.
          </p>

          <h2 className="font-serif text-xl text-parchment">7. Контакты</h2>
          <p>
            Телефон: +7 991 158-88-33 <br />
            Telegram: @likgall
          </p>

        </div>
      </div>
    </div>
  )
}

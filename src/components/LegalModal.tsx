import React from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export type LegalDocType = 'terms' | 'privacy' | 'shipping' | 'returns' | 'complaints' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  const { language } = useStore();

  if (!docType) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-700" />
            <span className="font-bold text-sm text-slate-900">
              {docType === 'terms' && 'Obchodní podmínky (Terms & Conditions)'}
              {docType === 'privacy' && 'Ochrana osobních údajů (GDPR Policy)'}
              {docType === 'shipping' && 'Doprava a platba'}
              {docType === 'returns' && 'Vrácení zboží a odstoupení od smlouvy'}
              {docType === 'complaints' && 'Reklamační řád'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
          {docType === 'privacy' && (
            <>
              <h3 className="text-base font-bold text-slate-900">Zásady ochrany osobních údajů (GDPR)</h3>
              <p>
                Provozovatel se sídlem U Tržiště 2206, 594 01 Velké Meziříčí, zpracovává osobní údaje zákazníků v plném souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR).
              </p>
              <h4 className="font-bold text-slate-800">1. Jaké údaje zpracováváme</h4>
              <p>
                Pro účely vyřízení vaší objednávky a doručení zásilky zpracováváme: jméno a příjmení, doručovací adresu, e-mailovou adresu a telefonní číslo pro kurýrní službu.
              </p>
              <h4 className="font-bold text-slate-800">2. Účel zpracování</h4>
              <p>
                Plnění kupní smlouvy, komunikace ohledně stavu objednávky, fakturace a zákonné účetní povinnosti. Údaje nikdy neprodáváme třetím stranám.
              </p>
              <h4 className="font-bold text-slate-800">3. Vaše práva</h4>
              <p>
                Máte právo požadovat přístup ke svým osobním údajům, jejich opravu, výmaz nebo omezení zpracování. Pro uplatnění svých práv nás kontaktujte na: <a href="mailto:lezara.info@gmail.com" className="text-rose-600 underline font-semibold">lezara.info@gmail.com</a> nebo telefonicky na <a href="tel:+420773868888" className="text-rose-600 underline font-semibold">+420 773 868 888</a>.
              </p>
            </>
          )}

          {docType === 'terms' && (
            <>
              <h3 className="text-base font-bold text-slate-900">Všeobecné obchodní podmínky</h3>
              <p>
                Tyto obchodní podmínky upravují práva a povinnosti mezi prodávajícím SEYOUL Skincare s.r.o. a kupujícím při nákupu prostřednictvím internetového obchodu seyoul.cz.
              </p>
              <h4 className="font-bold text-slate-800">1. Uzavření kupní smlouvy</h4>
              <p>
                Odesláním objednávky kupující potvrzuje, že se seznámil s těmito obchodními podmínkami. Kupní smlouva vzniká potvrzením objednávky ze strany prodávajícího.
              </p>
              <h4 className="font-bold text-slate-800">2. Cena a platba</h4>
              <p>
                Všechny ceny jsou konečné včetně DPH. Kupující může zvolit platbu kartou, Apple Pay, Google Pay, okamžitým převodem na účet nebo dobírkou.
              </p>
              <h4 className="font-bold text-slate-800">3. Doručení</h4>
              <p>
                Zboží je expedováno standardně do 24 hodin v pracovní dny a doručováno prostřednictvím zvoleného přepravce (Zásilkovna, PPL, DPD, GLS).
              </p>
            </>
          )}

          {docType === 'shipping' && (
            <>
              <h3 className="text-base font-bold text-slate-900">Doprava a způsoby platby</h3>
              <p>
                Zboží expedujeme z našeho skladu v České republice s rychlým doručením do 1–2 pracovních dnů.
              </p>
              <h4 className="font-bold text-slate-800">Přepravci:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Zásilkovna / Packeta:</strong> 69 Kč (výdejní místa a Z-BOXy po celé ČR)</li>
                <li><strong>PPL / DPD kurýr:</strong> od 99 Kč (doručení přímo do rukou)</li>
                <li><strong>Osobní odběr:</strong> ZDARMA v Praze</li>
                <li><strong>DOPRAVA ZDARMA:</strong> Při objednávce od 1 500 Kč nebo balíčku 3+ boxů</li>
              </ul>
              <h4 className="font-bold text-slate-800 mt-4">Platební metody:</h4>
              <p>
                Online platba kartou (0 Kč), Apple Pay (0 Kč), Google Pay (0 Kč), Bankovní QR převod (0 Kč), Dobírka (+39 Kč).
              </p>
            </>
          )}

          {docType === 'returns' && (
            <>
              <h3 className="text-base font-bold text-slate-900">Vrácení zboží a odstoupení od smlouvy</h3>
              <p>
                Jako spotřebitel máte právo odstoupit od smlouvy do 14 dnů od převzetí zboží bez udání důvodu.
              </p>
              <h4 className="font-bold text-slate-800">Podmínky hygieny kosmetiky</h4>
              <p>
                Vzhledem k hygienické povaze kosmetických hydrogelových masek lze vrátit pouze zboží v neotevřeném, nepoškozeném originálním balení s neporušenou pečetí v souladu s § 1837 občanského zákoníku.
              </p>
              <h4 className="font-bold text-slate-800">Postup vrácení:</h4>
              <p>
                Zabalte neporušené produkty a odešlete na naši adresu skladu. Částku vám vrátíme na bankovní účet do 7 dnů od doručení balíčku.
              </p>
            </>
          )}

          {docType === 'complaints' && (
            <>
              <h3 className="text-base font-bold text-slate-900">Reklamační řád</h3>
              <p>
                Na veškeré prodávané zboží se vztahuje zákonná záruka 24 měsíců ode dne převzetí.
              </p>
              <p>
                V případě vady výrobku nebo dotazů k doručení nás kontaktujte s fotografií a číslem objednávky na e-mail: <a href="mailto:lezara.info@gmail.com" className="text-rose-600 underline font-semibold">lezara.info@gmail.com</a> nebo telefonicky na <a href="tel:+420773868888" className="text-rose-600 underline font-semibold">+420 773 868 888</a>. Reklamace vyřizujeme obratem v nejkratším možném čase (maximálně do 30 dnů).
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-900 transition-colors"
          >
            Rozumím
          </button>
        </div>
      </div>
    </div>
  );
};

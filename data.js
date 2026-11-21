// Pololingo: Satzsammlung
// Format pro Satz: [Polnisch, Deutsch, Notiz (optional)]
// {männlich/weiblich}: Form wird nach deiner Einstellung gewählt.
// {NAME}: wird durch deinen Namen ersetzt.
// IDs ergeben sich aus Lektion + Position. Neue Sätze also nur HINTEN anhängen.

window.LESSONS = [
  {
    id: "L01", title: "Erste Sätze",
    goal: "Begrüßen, danken, verabschieden. Damit startet jedes Gespräch.",
    s: [
      ["Cześć!", "Hallo! / Tschüss! (locker)", "Unter Freunden zur Begrüßung und zum Abschied."],
      ["Dzień dobry.", "Guten Tag.", "Höflich, den ganzen Tag bis zum Abend."],
      ["Dobry wieczór.", "Guten Abend."],
      ["Do widzenia.", "Auf Wiedersehen."],
      ["Na razie!", "Bis dann!"],
      ["Dziękuję.", "Danke."],
      ["Dziękuję bardzo.", "Vielen Dank."],
      ["Proszę.", "Bitte. / Hier, bitte.", "Für „bitte“ beim Bitten und beim Überreichen."],
      ["Przepraszam.", "Entschuldigung."],
      ["Nie ma problemu.", "Kein Problem."],
      ["Tak, oczywiście.", "Ja, natürlich."],
      ["Nie, dziękuję.", "Nein, danke."],
      ["Jak się masz?", "Wie geht's dir?"],
      ["Dobrze, dzięki. A ty?", "Gut, danke. Und du?"],
      ["Wszystko w porządku.", "Alles in Ordnung."],
      ["Miło mi.", "Freut mich."],
      ["Do zobaczenia jutro.", "Bis morgen."],
      ["Dobranoc.", "Gute Nacht."],
      ["Smacznego!", "Guten Appetit!"],
      ["Na zdrowie!", "Prost! / Gesundheit!"]
    ]
  },
  {
    id: "L02", title: "Ich und du",
    goal: "Dich vorstellen und Fragen über andere stellen.",
    s: [
      ["Jak masz na imię?", "Wie heißt du?"],
      ["Mam na imię {NAME}.", "Ich heiße {NAME}.", "Wörtlich: Ich habe den Vornamen …"],
      ["Skąd jesteś?", "Woher kommst du?"],
      ["Jestem z Niemiec.", "Ich komme aus Deutschland.", "z + Genitiv: Niemcy → z Niemiec."],
      ["Jestem {Niemcem/Niemką}.", "Ich bin Deutsche(r).", "Nach „jestem“ + Nomen steht der Instrumental."],
      ["Mieszkam w Niemczech.", "Ich wohne in Deutschland."],
      ["Gdzie mieszkasz?", "Wo wohnst du?"],
      ["Uczę się polskiego.", "Ich lerne Polnisch.", "uczyć się + Genitiv."],
      ["Mówię trochę po polsku.", "Ich spreche ein bisschen Polnisch."],
      ["Nie mówię dobrze po polsku.", "Ich spreche nicht gut Polnisch."],
      ["Czy mówisz po niemiecku?", "Sprichst du Deutsch?", "„Czy“ macht aus einem Satz eine Ja/Nein-Frage."],
      ["Czy mówisz po angielsku?", "Sprichst du Englisch?"],
      ["Ile masz lat?", "Wie alt bist du?", "Wörtlich: Wie viele Jahre hast du?"],
      ["Mam dwadzieścia pięć lat.", "Ich bin 25 Jahre alt.", "2–4 → lata, ab 5 → lat."],
      ["Jestem {zmęczony/zmęczona}.", "Ich bin müde."],
      ["Jestem {głodny/głodna}.", "Ich habe Hunger."],
      ["To jest mój brat.", "Das ist mein Bruder."],
      ["To jest moja siostra.", "Das ist meine Schwester."],
      ["Kim jesteś z zawodu?", "Was bist du von Beruf?"],
      ["Pracuję w biurze.", "Ich arbeite in einem Büro.", "w + Lokativ: biuro → w biurze."],
      ["Jestem {studentem/studentką}.", "Ich bin Student(in).", "Instrumental nach „być“."]
    ]
  },
  {
    id: "L03", title: "Haben, wollen, können, mögen",
    goal: "Die wichtigsten Verben. Mit ihnen kannst du fast alles umschreiben.",
    s: [
      ["Mam pytanie.", "Ich habe eine Frage."],
      ["Nie mam czasu.", "Ich habe keine Zeit.", "Nach Verneinung steht der Genitiv: czas → czasu."],
      ["Masz chwilę?", "Hast du einen Moment?"],
      ["Chcę iść do domu.", "Ich will nach Hause gehen."],
      ["Co chcesz robić?", "Was willst du machen?"],
      ["Lubię kawę.", "Ich mag Kaffee.", "lubić + Akkusativ: kawa → kawę."],
      ["Nie lubię tego.", "Das mag ich nicht."],
      ["Bardzo mi się podoba.", "Das gefällt mir sehr."],
      ["Lubię czytać.", "Ich lese gern.", "lubić + Infinitiv = etwas gern tun."],
      ["Czy mogę zapytać?", "Darf ich fragen?"],
      ["Możesz mi pomóc?", "Kannst du mir helfen?"],
      ["Nie mogę teraz.", "Ich kann jetzt nicht."],
      ["Muszę już iść.", "Ich muss jetzt los."],
      ["Muszę pracować.", "Ich muss arbeiten."],
      ["Nie wiem.", "Ich weiß nicht."],
      ["Rozumiem.", "Ich verstehe."],
      ["Nie rozumiem.", "Ich verstehe nicht."],
      ["Myślę, że tak.", "Ich glaube schon."],
      ["Potrzebuję pomocy.", "Ich brauche Hilfe.", "potrzebować + Genitiv."],
      ["Mam ochotę na pizzę.", "Ich habe Lust auf Pizza."],
      ["Wolę herbatę.", "Ich trinke lieber Tee.", "woleć = lieber mögen."]
    ]
  },
  {
    id: "L04", title: "Fragen stellen",
    goal: "Wer fragt, hält das Gespräch am Laufen und bekommt Input.",
    s: [
      ["Co to jest?", "Was ist das?"],
      ["Gdzie jest toaleta?", "Wo ist die Toilette?"],
      ["Ile to kosztuje?", "Wie viel kostet das?"],
      ["Która jest godzina?", "Wie spät ist es?"],
      ["Kiedy się spotkamy?", "Wann treffen wir uns?"],
      ["Dlaczego nie?", "Warum nicht?"],
      ["Jak to się mówi po polsku?", "Wie sagt man das auf Polnisch?"],
      ["Co to znaczy?", "Was bedeutet das?"],
      ["Jak to się pisze?", "Wie schreibt man das?"],
      ["Kto to jest?", "Wer ist das?"],
      ["Co robisz?", "Was machst du?"],
      ["Co słychać?", "Was gibt's Neues?", "Wörtlich: Was ist zu hören?"],
      ["Gdzie jesteś?", "Wo bist du?"],
      ["Jak długo tu mieszkasz?", "Wie lange wohnst du schon hier?"],
      ["Który wolisz?", "Welchen magst du lieber?"],
      ["Czy to daleko?", "Ist das weit?"],
      ["Czy jest tu wifi?", "Gibt es hier WLAN?"],
      ["Co polecasz?", "Was empfiehlst du?"],
      ["O czym myślisz?", "Woran denkst du?"],
      ["Z kim idziesz?", "Mit wem gehst du?"],
      ["Dokąd idziesz?", "Wohin gehst du?"]
    ]
  },
  {
    id: "L05", title: "Café, Restaurant, Laden",
    goal: "Bestellen, bezahlen, einkaufen.",
    s: [
      ["Poproszę kawę z mlekiem.", "Einen Kaffee mit Milch, bitte.", "„Poproszę …“ ist die übliche höfliche Bestellung."],
      ["Poproszę wodę niegazowaną.", "Ein stilles Wasser, bitte."],
      ["Poproszę rachunek.", "Die Rechnung, bitte."],
      ["Czy mogę zapłacić kartą?", "Kann ich mit Karte zahlen?", "Instrumental: karta → kartą (womit?)."],
      ["Na miejscu czy na wynos?", "Zum Hieressen oder zum Mitnehmen?"],
      ["Na wynos, proszę.", "Zum Mitnehmen, bitte."],
      ["Stolik dla dwóch osób.", "Einen Tisch für zwei Personen."],
      ["Co pan poleca?", "Was empfehlen Sie?", "Höfliche Anrede: pan (Mann), pani (Frau) + 3. Person."],
      ["Czy to jest ostre?", "Ist das scharf?"],
      ["To było pyszne!", "Das war lecker!"],
      ["Jeszcze jedno piwo, proszę.", "Noch ein Bier, bitte."],
      ["Szukam apteki.", "Ich suche eine Apotheke.", "szukać + Genitiv."],
      ["Ile kosztuje bilet?", "Was kostet das Ticket?"],
      ["To za drogo.", "Das ist zu teuer."],
      ["Wezmę to.", "Ich nehme das."],
      ["Tylko się rozglądam.", "Ich schaue mich nur um."],
      ["Macie chleb?", "Habt ihr Brot?"],
      ["Reszty nie trzeba.", "Stimmt so."],
      ["Poproszę torbę.", "Eine Tüte, bitte."],
      ["Smakuje ci?", "Schmeckt es dir?"]
    ]
  },
  {
    id: "L06", title: "Unterwegs",
    goal: "Wege finden, fahren, ankommen.",
    s: [
      ["Jak dojść na dworzec?", "Wie komme ich zu Fuß zum Bahnhof?"],
      ["Idź prosto, potem w lewo.", "Geh geradeaus, dann links."],
      ["To jest po prawej stronie.", "Das ist auf der rechten Seite."],
      ["Idę do sklepu.", "Ich gehe in den Laden.", "iść = zu Fuß gehen."],
      ["Jadę do Krakowa.", "Ich fahre nach Krakau.", "jechać = fahren. do + Genitiv."],
      ["Jedziemy autobusem.", "Wir fahren mit dem Bus.", "Verkehrsmittel im Instrumental."],
      ["Gdzie jest przystanek?", "Wo ist die Haltestelle?"],
      ["To jest blisko.", "Das ist in der Nähe."],
      ["Jestem w domu.", "Ich bin zu Hause."],
      ["Wracam do domu.", "Ich gehe nach Hause zurück."],
      ["{Zgubiłem/Zgubiłam} się.", "Ich habe mich verlaufen."],
      ["Czy ten autobus jedzie do centrum?", "Fährt dieser Bus ins Zentrum?"],
      ["Gdzie mogę kupić bilet?", "Wo kann ich ein Ticket kaufen?"],
      ["Jestem w drodze.", "Ich bin unterwegs."],
      ["Będę za dziesięć minut.", "Ich bin in zehn Minuten da."],
      ["Spóźnię się trochę.", "Ich komme ein bisschen später."],
      ["Chodźmy!", "Lass uns gehen!"],
      ["Poczekaj chwilę.", "Warte kurz."],
      ["Przyjdziesz?", "Kommst du?"],
      ["Lecę jutro do Warszawy.", "Ich fliege morgen nach Warschau."]
    ]
  },
  {
    id: "L07", title: "Zeit und Zahlen",
    goal: "Uhrzeit, Wochentage, Preise und wie oft du etwas tust.",
    s: [
      ["Jest trzecia.", "Es ist drei Uhr."],
      ["Spotkajmy się o szóstej.", "Treffen wir uns um sechs."],
      ["Dzisiaj jest poniedziałek.", "Heute ist Montag."],
      ["Jutro pracuję.", "Morgen arbeite ich."],
      ["W weekend mam wolne.", "Am Wochenende habe ich frei."],
      ["W sobotę idę na imprezę.", "Am Samstag gehe ich auf eine Party.", "w + Akkusativ für Wochentage: sobota → w sobotę."],
      ["Rano piję kawę.", "Morgens trinke ich Kaffee."],
      ["Wieczorem oglądam film.", "Abends schaue ich einen Film."],
      ["Codziennie uczę się polskiego.", "Ich lerne jeden Tag Polnisch."],
      ["Mam czas we wtorek.", "Am Dienstag habe ich Zeit."],
      ["Jeden, dwa, trzy, cztery, pięć.", "Eins, zwei, drei, vier, fünf."],
      ["Sześć, siedem, osiem, dziewięć, dziesięć.", "Sechs, sieben, acht, neun, zehn."],
      ["To kosztuje dwadzieścia złotych.", "Das kostet zwanzig Złoty."],
      ["Mam dwa bilety.", "Ich habe zwei Tickets."],
      ["Za pięć minut.", "In fünf Minuten."],
      ["Teraz nie mam czasu, może później.", "Jetzt habe ich keine Zeit, vielleicht später."],
      ["Wracam za tydzień.", "Ich komme in einer Woche zurück."],
      ["Mieszkam tu od dwóch lat.", "Ich wohne seit zwei Jahren hier."],
      ["Zawsze się spóźniasz.", "Du kommst immer zu spät."],
      ["Czasami gram w piłkę.", "Manchmal spiele ich Fußball."]
    ]
  },
  {
    id: "L08", title: "Vergangenheit",
    goal: "Erzählen, was passiert ist. Die Endung zeigt, wer spricht: -łem (Mann), -łam (Frau).",
    s: [
      ["{Byłem/Byłam} w Polsce.", "Ich war in Polen."],
      ["{Byłem/Byłam} wczoraj w kinie.", "Ich war gestern im Kino."],
      ["Co wczoraj robiłeś?", "Was hast du gestern gemacht?", "Zu einem Mann. Zu einer Frau: robiłaś."],
      ["{Zrobiłem/Zrobiłam} to.", "Ich habe das gemacht."],
      ["Nie {spałem/spałam} dobrze.", "Ich habe nicht gut geschlafen."],
      ["{Zapomniałem/Zapomniałam}.", "Ich habe es vergessen."],
      ["{Kupiłem/Kupiłam} nowy telefon.", "Ich habe ein neues Handy gekauft."],
      ["{Widziałem/Widziałam} ten film.", "Ich habe den Film gesehen."],
      ["{Jadłem/Jadłam} pierogi.", "Ich habe Piroggen gegessen."],
      ["{Mówiłem/Mówiłam} ci!", "Ich hab's dir gesagt!"],
      ["Nie {wiedziałem/wiedziałam}.", "Ich wusste es nicht."],
      ["{Mieszkałem/Mieszkałam} tam dwa lata.", "Ich habe dort zwei Jahre gewohnt."],
      ["Co się stało?", "Was ist passiert?"],
      ["To było super.", "Das war super."],
      ["Było zimno.", "Es war kalt."],
      ["Wczoraj padało.", "Gestern hat es geregnet."],
      ["{Zacząłem/Zaczęłam} się uczyć polskiego.", "Ich habe angefangen, Polnisch zu lernen."],
      ["Gdzie byłeś?", "Wo warst du?", "Zu einem Mann. Zu einer Frau: byłaś."],
      ["{Musiałem/Musiałam} pracować.", "Ich musste arbeiten."],
      ["{Chciałem/Chciałam} zapytać, czy masz czas.", "Ich wollte fragen, ob du Zeit hast."],
      ["Jak było?", "Wie war's?"]
    ]
  },
  {
    id: "L09", title: "Zukunft und Pläne",
    goal: "Pläne machen. Vollendete Verben im Präsens drücken Zukunft aus: zrobię = ich werde machen.",
    s: [
      ["Zadzwonię do ciebie.", "Ich rufe dich an."],
      ["Napiszę ci jutro.", "Ich schreibe dir morgen."],
      ["Zrobię to później.", "Ich mache das später."],
      ["Będę w domu wieczorem.", "Ich bin abends zu Hause."],
      ["Będę pracować w sobotę.", "Ich werde am Samstag arbeiten.", "będę + Infinitiv = Zukunft für unvollendete Verben."],
      ["Co będziesz robić w weekend?", "Was machst du am Wochenende?"],
      ["Pojedziemy nad morze.", "Wir fahren ans Meer."],
      ["Zobaczymy.", "Mal sehen."],
      ["Spróbuję.", "Ich versuche es."],
      ["Pomogę ci.", "Ich helfe dir."],
      ["Przyjdę o siódmej.", "Ich komme um sieben."],
      ["Kupię bilety.", "Ich kaufe die Tickets."],
      ["Będzie dobrze.", "Es wird gut."],
      ["Jutro będzie padać.", "Morgen wird es regnen."],
      ["Za rok chcę mówić płynnie po polsku.", "In einem Jahr will ich fließend Polnisch sprechen."],
      ["Nie zapomnę.", "Ich werde es nicht vergessen."],
      ["Do kiedy zostaniesz?", "Bis wann bleibst du?"],
      ["Zostanę tydzień.", "Ich bleibe eine Woche."],
      ["Odezwę się.", "Ich melde mich."],
      ["Daj znać.", "Sag Bescheid."]
    ]
  },
  {
    id: "L10", title: "Gespräch am Laufen halten",
    goal: "Die Sätze, die dich retten, wenn du etwas nicht verstehst oder Zeit zum Denken brauchst.",
    s: [
      ["Możesz powtórzyć?", "Kannst du das wiederholen?"],
      ["Możesz mówić wolniej?", "Kannst du langsamer sprechen?"],
      ["Nie znam tego słowa.", "Ich kenne dieses Wort nicht."],
      ["Chodzi mi o to, że…", "Ich meine damit, dass …"],
      ["To znaczy…", "Das heißt …"],
      ["No właśnie!", "Genau!"],
      ["Naprawdę?", "Wirklich?"],
      ["Nie wierzę!", "Das glaub ich nicht!"],
      ["Masz rację.", "Du hast recht."],
      ["Zgadzam się.", "Ich stimme zu."],
      ["Nie zgadzam się.", "Da bin ich anderer Meinung."],
      ["To zależy.", "Das kommt darauf an."],
      ["Nie jestem {pewien/pewna}.", "Ich bin nicht sicher."],
      ["Szczerze mówiąc…", "Ehrlich gesagt …"],
      ["Wydaje mi się, że to dobry pomysł.", "Ich glaube, das ist eine gute Idee."],
      ["Dobry pomysł!", "Gute Idee!"],
      ["Nie ma sprawy.", "Kein Ding."],
      ["Jasne.", "Klar."],
      ["Czekaj, muszę pomyśleć.", "Warte, ich muss nachdenken."],
      ["Jak to powiedzieć…", "Wie soll ich sagen …"],
      ["Super, że jesteś.", "Toll, dass du da bist."],
      ["Szkoda.", "Schade."],
      ["Nieważne.", "Egal. / Nicht so wichtig."]
    ]
  },
  {
    id: "L11", title: "Familie, Arbeit, Freizeit",
    goal: "Über dich und dein Leben reden.",
    s: [
      ["Mam brata i siostrę.", "Ich habe einen Bruder und eine Schwester."],
      ["Moi rodzice mieszkają w Niemczech.", "Meine Eltern wohnen in Deutschland."],
      ["Masz rodzeństwo?", "Hast du Geschwister?"],
      ["Pracuję od poniedziałku do piątku.", "Ich arbeite von Montag bis Freitag."],
      ["Lubię moją pracę.", "Ich mag meine Arbeit."],
      ["W wolnym czasie gram w gry.", "In meiner Freizeit spiele ich Spiele."],
      ["Lubię gotować.", "Ich koche gern."],
      ["Często chodzę na siłownię.", "Ich gehe oft ins Fitnessstudio.", "chodzić = regelmäßig gehen, iść = jetzt gehen."],
      ["Słucham muzyki.", "Ich höre Musik.", "słuchać + Genitiv."],
      ["Jakie masz hobby?", "Was hast du für Hobbys?"],
      ["Mam psa.", "Ich habe einen Hund."],
      ["Mój przyjaciel jest z Polski.", "Mein Freund ist aus Polen."],
      ["Moja mama dobrze gotuje.", "Meine Mutter kocht gut."],
      ["Mam dużo pracy.", "Ich habe viel Arbeit.", "dużo + Genitiv."],
      ["Jestem {zajęty/zajęta}.", "Ich bin beschäftigt."],
      ["Oglądasz seriale?", "Schaust du Serien?"],
      ["Jaki jest twój ulubiony film?", "Was ist dein Lieblingsfilm?"],
      ["Lubię podróżować.", "Ich reise gern."],
      ["Pogoda jest dziś piękna.", "Das Wetter ist heute schön."],
      ["Jest zimno.", "Es ist kalt."]
    ]
  },
  {
    id: "L12", title: "Sätze verbinden",
    goal: "Mit weil, aber, also, dass, wenn wird aus Einzelsätzen echtes Erzählen.",
    s: [
      ["Uczę się polskiego, bo chcę rozmawiać z przyjaciółmi.", "Ich lerne Polnisch, weil ich mit Freunden reden will."],
      ["Chcę iść, ale nie mam czasu.", "Ich will gehen, aber ich habe keine Zeit."],
      ["Jestem {zmęczony/zmęczona}, więc idę spać.", "Ich bin müde, also gehe ich schlafen."],
      ["Myślę, że masz rację.", "Ich glaube, dass du recht hast."],
      ["Jeśli chcesz, możemy iść razem.", "Wenn du willst, können wir zusammen gehen."],
      ["Kiedy mam czas, czytam.", "Wenn ich Zeit habe, lese ich."],
      ["Nie wiem, czy mogę przyjść.", "Ich weiß nicht, ob ich kommen kann."],
      ["Wiesz, gdzie on mieszka?", "Weißt du, wo er wohnt?"],
      ["Powiedział, że przyjdzie.", "Er hat gesagt, dass er kommt."],
      ["Zanim wyjdę, zadzwonię.", "Bevor ich gehe, rufe ich an."],
      ["Po pracy idę do domu.", "Nach der Arbeit gehe ich nach Hause."],
      ["Mimo że pada, idziemy na spacer.", "Obwohl es regnet, gehen wir spazieren."],
      ["Albo dzisiaj, albo jutro.", "Entweder heute oder morgen."],
      ["Dlatego się uczę.", "Deshalb lerne ich."],
      ["Gdybym {miał/miała} czas, {pojechałbym/pojechałabym} do Polski.", "Wenn ich Zeit hätte, würde ich nach Polen fahren."],
      ["Też tak myślę.", "Das denke ich auch."],
      ["Najpierw jemy, potem idziemy do kina.", "Zuerst essen wir, dann gehen wir ins Kino."],
      ["To jest coś, co lubię.", "Das ist etwas, das ich mag."],
      ["Ten pan, który tam stoi, to mój szef.", "Der Mann, der dort steht, ist mein Chef."],
      ["Ani ja, ani on.", "Weder ich noch er."]
    ]
  }
];

// Kurze Geschichten für verständlichen Input. Jede Zeile: [Polnisch, Deutsch]
window.STORIES = [
  {
    id: "S1", title: "Kawa w Krakowie", level: "nach Lektion 5",
    lines: [
      ["Jest sobota.", "Es ist Samstag."],
      ["Tomek jest w Krakowie.", "Tomek ist in Krakau."],
      ["Rano idzie do małej kawiarni.", "Morgens geht er in ein kleines Café."],
      ["W kawiarni jest dużo ludzi.", "Im Café sind viele Leute."],
      ["Tomek mówi: „Dzień dobry, poproszę kawę z mlekiem”.", "Tomek sagt: „Guten Tag, einen Kaffee mit Milch, bitte.“"],
      ["Kelnerka pyta: „Na miejscu czy na wynos?”", "Die Kellnerin fragt: „Zum Hieressen oder zum Mitnehmen?“"],
      ["„Na miejscu” – odpowiada Tomek.", "„Zum Hieressen“, antwortet Tomek."],
      ["Siada przy oknie i patrzy na ulicę.", "Er setzt sich ans Fenster und schaut auf die Straße."],
      ["Kawa jest gorąca i bardzo dobra.", "Der Kaffee ist heiß und sehr gut."],
      ["Tomek jest szczęśliwy, bo ma wolny dzień.", "Tomek ist glücklich, weil er einen freien Tag hat."]
    ]
  },
  {
    id: "S2", title: "Pierwsza rozmowa", level: "nach Lektion 4",
    lines: [
      ["– Cześć! Jestem Ola. A ty?", "– Hallo! Ich bin Ola. Und du?"],
      ["– Cześć, mam na imię Paul. Jestem z Niemiec.", "– Hallo, ich heiße Paul. Ich komme aus Deutschland."],
      ["– Naprawdę? Mówisz bardzo dobrze po polsku!", "– Wirklich? Du sprichst sehr gut Polnisch!"],
      ["– Dziękuję, ale jeszcze się uczę.", "– Danke, aber ich lerne noch."],
      ["– Jak długo się uczysz?", "– Wie lange lernst du schon?"],
      ["– Od pół roku. Codziennie trochę.", "– Seit einem halben Jahr. Jeden Tag ein bisschen."],
      ["– Super! Dlaczego polski?", "– Super! Warum Polnisch?"],
      ["– Bo lubię Polskę i mam tu przyjaciół.", "– Weil ich Polen mag und hier Freunde habe."],
      ["– To może pójdziemy kiedyś na kawę?", "– Gehen wir dann vielleicht mal einen Kaffee trinken?"],
      ["– Chętnie! Daj mi swój numer.", "– Gern! Gib mir deine Nummer."]
    ]
  },
  {
    id: "S3", title: "Nowa praca", level: "nach Lektion 7",
    lines: [
      ["Anna ma nową pracę.", "Anna hat eine neue Arbeit."],
      ["Pracuje w biurze w Warszawie.", "Sie arbeitet in einem Büro in Warschau."],
      ["Codziennie jeździ do pracy tramwajem.", "Jeden Tag fährt sie mit der Straßenbahn zur Arbeit."],
      ["Tramwaj jedzie dwadzieścia minut.", "Die Straßenbahn fährt zwanzig Minuten."],
      ["W pracy Anna ma miłych kolegów.", "Bei der Arbeit hat Anna nette Kollegen."],
      ["Jeden kolega jest z Niemiec i uczy się polskiego.", "Ein Kollege kommt aus Deutschland und lernt Polnisch."],
      ["Czasami mówi źle, ale wszyscy go rozumieją.", "Manchmal spricht er falsch, aber alle verstehen ihn."],
      ["Anna mu pomaga, a on uczy ją niemieckiego.", "Anna hilft ihm, und er bringt ihr Deutsch bei."],
      ["Po pracy idą razem na obiad.", "Nach der Arbeit gehen sie zusammen Mittag essen."],
      ["Anna myśli, że to dobra praca.", "Anna findet, dass es eine gute Arbeit ist."]
    ]
  },
  {
    id: "S4", title: "Zakupy dla babci", level: "nach Lektion 8",
    lines: [
      ["Babcia prosi Kubę o pomoc.", "Die Oma bittet Kuba um Hilfe."],
      ["„Kuba, możesz iść do sklepu?”", "„Kuba, kannst du in den Laden gehen?“"],
      ["„Jasne, babciu. Co mam kupić?”", "„Klar, Oma. Was soll ich kaufen?“"],
      ["„Chleb, mleko, masło i dwa kilo ziemniaków.”", "„Brot, Milch, Butter und zwei Kilo Kartoffeln.“"],
      ["Kuba idzie do sklepu na rogu.", "Kuba geht in den Laden an der Ecke."],
      ["Niestety nie ma masła.", "Leider gibt es keine Butter."],
      ["Kuba kupuje wszystko inne i wraca do domu.", "Kuba kauft alles andere und geht nach Hause zurück."],
      ["„Przepraszam, babciu, nie było masła.”", "„Entschuldige, Oma, es gab keine Butter.“"],
      ["„Nic nie szkodzi. Kupimy jutro.”", "„Macht nichts. Wir kaufen sie morgen.“"],
      ["Babcia robi pyszną zupę ziemniaczaną.", "Die Oma kocht eine leckere Kartoffelsuppe."]
    ]
  },
  {
    id: "S5", title: "Weekend nad morzem", level: "nach Lektion 8",
    lines: [
      ["W zeszły weekend Marek i Kasia pojechali nad morze.", "Letztes Wochenende sind Marek und Kasia ans Meer gefahren."],
      ["Pojechali pociągiem do Gdańska.", "Sie sind mit dem Zug nach Danzig gefahren."],
      ["Podróż trwała cztery godziny.", "Die Reise hat vier Stunden gedauert."],
      ["W sobotę było słonecznie i ciepło.", "Am Samstag war es sonnig und warm."],
      ["Cały dzień leżeli na plaży.", "Den ganzen Tag lagen sie am Strand."],
      ["Wieczorem jedli rybę w małej restauracji.", "Abends haben sie in einem kleinen Restaurant Fisch gegessen."],
      ["W niedzielę padało, więc poszli do muzeum.", "Am Sonntag hat es geregnet, also sind sie ins Museum gegangen."],
      ["Muzeum było bardzo ciekawe.", "Das Museum war sehr interessant."],
      ["Wrócili do domu zmęczeni, ale zadowoleni.", "Sie kamen müde, aber zufrieden nach Hause."]
    ]
  },
  {
    id: "S6", title: "Plan na jutro", level: "nach Lektion 9",
    lines: [
      ["Jutro Ewa ma dużo planów.", "Morgen hat Ewa viele Pläne."],
      ["Rano pójdzie na siłownię.", "Morgens geht sie ins Fitnessstudio."],
      ["Potem spotka się z koleżanką w parku.", "Danach trifft sie sich mit einer Freundin im Park."],
      ["Zjedzą razem lody i porozmawiają.", "Sie essen zusammen ein Eis und unterhalten sich."],
      ["Po południu Ewa będzie się uczyć do egzaminu.", "Nachmittags lernt Ewa für eine Prüfung."],
      ["Wieczorem zadzwoni do mamy.", "Abends ruft sie ihre Mutter an."],
      ["Jeśli będzie miała czas, obejrzy film.", "Wenn sie Zeit hat, schaut sie einen Film."],
      ["Ewa myśli: „To będzie dobry dzień”.", "Ewa denkt: „Das wird ein guter Tag.“"]
    ]
  }
];

// Aussprache: [Buchstabe(n), Erklärung für Deutschsprachige, Beispielwort, Bedeutung]
window.SOUNDS = [
  ["Betonung", "Fast immer auf der vorletzten Silbe.", "Polska, rozumiem, dziękuję", "Polen, ich verstehe, danke"],
  ["y", "Dunkles i, wie in „bitte“, nur weiter hinten.", "my, ty, ryba", "wir, du, Fisch"],
  ["ó / u", "Beide klingen gleich: wie deutsches u.", "góra, but", "Berg, Schuh"],
  ["ą", "Nasales o, wie französisch „on“.", "są, wąski", "sie sind, schmal"],
  ["ę", "Nasales e. Am Wortende oft fast nur e.", "ręka, dziękuję", "Hand, danke"],
  ["ł", "Wie englisches w in „water“.", "łyżka, mały", "Löffel, klein"],
  ["w", "Wie deutsches w.", "woda, kawa", "Wasser, Kaffee"],
  ["c", "Wie deutsches z in „Zeit“.", "co, noc", "was, Nacht"],
  ["z", "Weiches, summendes s wie in „Sonne“.", "zupa, zima", "Suppe, Winter"],
  ["s", "Scharfes s wie in „Haus“.", "sok, sen", "Saft, Schlaf"],
  ["sz", "Hartes sch, Zunge hinten.", "szkoła, szafa", "Schule, Schrank"],
  ["cz", "Hartes tsch.", "czas, czekolada", "Zeit, Schokolade"],
  ["rz / ż", "Wie j in „Journal“ (stimmhaftes sch).", "rzeka, żaba, morze", "Fluss, Frosch, Meer"],
  ["ś / si", "Weiches sch, Zunge vorne, Lippen breit (fast wie „ch“ in „ich“).", "śnieg, siostra", "Schnee, Schwester"],
  ["ć / ci", "Weiches tsch.", "ciocia, być", "Tante, sein"],
  ["ź / zi", "Weiches, summendes sch.", "zima, źle", "Winter, schlecht"],
  ["dz / dż / dź", "Wie ds, wie dsch hart, wie dsch weich.", "dzwon, dżem, dzień", "Glocke, Marmelade, Tag"],
  ["ń / ni", "Wie nj, wie in „Cognac“.", "koń, nie", "Pferd, nein"],
  ["ch / h", "Wie ch in „Bach“.", "chleb, herbata", "Brot, Tee"],
  ["r", "Mit der Zungenspitze gerollt.", "rower, ryba", "Fahrrad, Fisch"],
  ["szcz", "sch + tsch hintereinander.", "szczęście, jeszcze", "Glück, noch"],
  ["Endhärtung", "Wie im Deutschen: am Wortende wird b → p, d → t, w → f.", "chleb, sad, Kraków", "Brot, Garten, Krakau"]
];

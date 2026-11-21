// Pololingo: Grammatik zum Sprechen
// Jede Einheit: kurze Erklärung + Tabelle + Umform-Drills (laut sprechen, FSRS plant sie ein).
// Drill: [Ausgangssatz, Hinweis/Umformung, Zielsatz, Deutsch, Notiz (optional)]
// "after": Die Einheit wird freigeschaltet, wenn alle Sätze dieser Lektion dran waren.
// Neue Drills nur HINTEN anhängen (IDs = Einheit + Position).

window.GRAMMAR = [
  {
    id: "G01", after: "L02", title: "być: sein",
    explain: [
      "Das wichtigste Verb. Die Endung zeigt schon, wer gemeint ist. Deshalb lässt man ja, ty, my und wy im Gespräch meist weg.",
      "on (er), ona (sie) und oni (sie, Mehrzahl) sagt man öfter dazu, weil sonst unklar wäre, über wen du redest."
    ],
    table: { head: ["Person", "być", "Deutsch"], say: [1], rows: [
      ["ja", "jestem", "ich bin"], ["ty", "jesteś", "du bist"], ["on / ona", "jest", "er / sie ist"],
      ["my", "jesteśmy", "wir sind"], ["wy", "jesteście", "ihr seid"], ["oni", "są", "sie sind"]] },
    drills: [
      ["Jestem w domu.", "ty", "Jesteś w domu.", "Du bist zu Hause."],
      ["Jestem w domu.", "on", "On jest w domu.", "Er ist zu Hause."],
      ["Jestem w domu.", "my", "Jesteśmy w domu.", "Wir sind zu Hause."],
      ["Jestem w domu.", "wy", "Jesteście w domu.", "Ihr seid zu Hause."],
      ["Jestem w domu.", "oni", "Oni są w domu.", "Sie sind zu Hause."],
      ["Jestem {zmęczony/zmęczona}.", "ona", "Ona jest zmęczona.", "Sie ist müde."],
      ["Jestem z Niemiec.", "my", "Jesteśmy z Niemiec.", "Wir kommen aus Deutschland."],
      ["Gdzie jesteś?", "wy", "Gdzie jesteście?", "Wo seid ihr?"],
      ["Ona jest w pracy.", "ja", "Jestem w pracy.", "Ich bin bei der Arbeit."]
    ]
  },
  {
    id: "G02", after: "L03", title: "Gegenwart 1: -m, -sz (mam, masz)",
    explain: [
      "Viele Verben auf -ać gehen nach diesem Muster: mieć (haben), czytać (lesen), mieszkać (wohnen), słuchać (hören), znać (kennen), grać (spielen).",
      "Merke dir nur die ich- und du-Form: mam, masz. Der Rest folgt immer gleich: -m, -sz, –, -my, -cie, -ją."
    ],
    table: { head: ["Person", "mieć", "czytać"], say: [1, 2], rows: [
      ["ja", "mam", "czytam"], ["ty", "masz", "czytasz"], ["on / ona", "ma", "czyta"],
      ["my", "mamy", "czytamy"], ["wy", "macie", "czytacie"], ["oni", "mają", "czytają"]] },
    drills: [
      ["Mam czas.", "ty", "Masz czas.", "Du hast Zeit."],
      ["Mam czas.", "ona", "Ona ma czas.", "Sie hat Zeit."],
      ["Mam czas.", "my", "Mamy czas.", "Wir haben Zeit."],
      ["Mam czas.", "oni", "Oni mają czas.", "Sie haben Zeit."],
      ["Mieszkam w Berlinie.", "ty", "Mieszkasz w Berlinie.", "Du wohnst in Berlin."],
      ["Mieszkam w Berlinie.", "my", "Mieszkamy w Berlinie.", "Wir wohnen in Berlin."],
      ["Czytam książkę.", "on", "On czyta książkę.", "Er liest ein Buch."],
      ["Czytam książkę.", "wy", "Czytacie książkę.", "Ihr lest ein Buch."],
      ["Słucham muzyki.", "oni", "Oni słuchają muzyki.", "Sie hören Musik."],
      ["Znam go.", "ty", "Znasz go.", "Du kennst ihn."],
      ["Gram w piłkę.", "my", "Gramy w piłkę.", "Wir spielen Fußball."]
    ]
  },
  {
    id: "G03", after: "L03", title: "Gegenwart 2: -ę, -esz / -isz (chcę, mówisz)",
    explain: [
      "Das zweite große Muster: ich endet auf -ę, sie (Mehrzahl) auf -ą. Dazwischen steht -e- oder -i-/-y-.",
      "Dazu gehören die Alltagsverben chcieć (wollen), móc (können), musieć (müssen), mówić (sprechen), robić (machen), iść (gehen), uczyć się (lernen).",
      "Achtung: Bei manchen ändert sich der Stamm: mogę, aber możesz. idę, aber idziesz."
    ],
    table: { head: ["Person", "chcieć", "mówić", "móc"], say: [1, 2, 3], rows: [
      ["ja", "chcę", "mówię", "mogę"], ["ty", "chcesz", "mówisz", "możesz"], ["on / ona", "chce", "mówi", "może"],
      ["my", "chcemy", "mówimy", "możemy"], ["wy", "chcecie", "mówicie", "możecie"], ["oni", "chcą", "mówią", "mogą"]] },
    drills: [
      ["Chcę kawę.", "ty", "Chcesz kawę.", "Du willst einen Kaffee."],
      ["Chcę kawę.", "oni", "Oni chcą kawę.", "Sie wollen einen Kaffee."],
      ["Mówię po polsku.", "ona", "Ona mówi po polsku.", "Sie spricht Polnisch."],
      ["Mówię po polsku.", "my", "Mówimy po polsku.", "Wir sprechen Polnisch."],
      ["Mogę przyjść.", "ty", "Możesz przyjść.", "Du kannst kommen."],
      ["Mogę przyjść.", "wy", "Możecie przyjść.", "Ihr könnt kommen."],
      ["Robię obiad.", "on", "On robi obiad.", "Er macht Mittagessen."],
      ["Robię obiad.", "my", "Robimy obiad.", "Wir machen Mittagessen."],
      ["Idę do domu.", "ty", "Idziesz do domu.", "Du gehst nach Hause."],
      ["Idę do domu.", "oni", "Oni idą do domu.", "Sie gehen nach Hause."],
      ["Muszę pracować.", "ona", "Ona musi pracować.", "Sie muss arbeiten."],
      ["Uczę się polskiego.", "my", "Uczymy się polskiego.", "Wir lernen Polnisch."]
    ]
  },
  {
    id: "G04", after: "L04", title: "Verneinung: nie + Genitiv",
    explain: [
      "Verneinst du ein Verb, das sonst ein Objekt im Akkusativ hat, wechselt das Objekt in den Genitiv. Das passiert ständig im Gespräch.",
      "Faustregel: -a wird zu -y oder -i (kawa → kawy). Männliche Wörter bekommen meist -u oder -a (czas → czasu). -o wird zu -a (masło → masła).",
      "„Es gibt“ heißt jest, „es gibt nicht“ heißt nie ma + Genitiv."
    ],
    table: { head: ["Ja", "Nein (Genitiv)", "Deutsch"], say: [0, 1], rows: [
      ["Mam czas.", "Nie mam czasu.", "keine Zeit"], ["Lubię kawę.", "Nie lubię kawy.", "keinen Kaffee"],
      ["Mam samochód.", "Nie mam samochodu.", "kein Auto"], ["Jest masło.", "Nie ma masła.", "keine Butter"]] },
    drills: [
      ["Mam czas.", "verneinen", "Nie mam czasu.", "Ich habe keine Zeit."],
      ["Mam samochód.", "verneinen", "Nie mam samochodu.", "Ich habe kein Auto."],
      ["Lubię kawę.", "verneinen", "Nie lubię kawy.", "Ich mag keinen Kaffee."],
      ["Piję herbatę.", "verneinen", "Nie piję herbaty.", "Ich trinke keinen Tee."],
      ["Jest masło.", "verneinen", "Nie ma masła.", "Es gibt keine Butter."],
      ["Jest tu wifi.", "verneinen", "Nie ma tu wifi.", "Hier gibt es kein WLAN."],
      ["Widzę dworzec.", "verneinen", "Nie widzę dworca.", "Ich sehe den Bahnhof nicht."],
      ["Mam pytanie.", "verneinen", "Nie mam pytania.", "Ich habe keine Frage."],
      ["Mam brata.", "verneinen", "Nie mam brata.", "Ich habe keinen Bruder.", "Bei Personen und Tieren (männlich) sind Akkusativ und Genitiv gleich."]
    ]
  },
  {
    id: "G05", after: "L05", title: "Akkusativ: was du willst, magst, hast",
    explain: [
      "Nach den meisten Verben (mieć, chcieć, lubić, kupić, poproszę …) steht der Akkusativ.",
      "Gute Nachricht: Nur zwei Fälle ändern sich. Weibliche Wörter auf -a bekommen -ę (kawa → kawę). Männliche Personen und Tiere bekommen -a (brat → brata, pies → psa).",
      "Männliche Dinge und sächliche Wörter bleiben gleich (telefon, piwo)."
    ],
    table: { head: ["Grundform", "Akkusativ", "Regel"], say: [0, 1], rows: [
      ["kawa", "kawę", "-a → -ę"], ["siostra", "siostrę", "-a → -ę"], ["brat", "brata", "Person: + a"],
      ["pies", "psa", "Tier: + a"], ["telefon", "telefon", "Ding: bleibt"], ["piwo", "piwo", "sächlich: bleibt"]] },
    drills: [
      ["kawa", "Poproszę …", "Poproszę kawę.", "Einen Kaffee, bitte."],
      ["herbata", "Poproszę …", "Poproszę herbatę.", "Einen Tee, bitte."],
      ["woda", "Poproszę …", "Poproszę wodę.", "Ein Wasser, bitte."],
      ["piwo", "Poproszę …", "Poproszę piwo.", "Ein Bier, bitte."],
      ["zupa", "Lubię …", "Lubię zupę.", "Ich mag Suppe."],
      ["muzyka", "Lubię …", "Lubię muzykę.", "Ich mag Musik."],
      ["książka", "Czytam …", "Czytam książkę.", "Ich lese ein Buch."],
      ["siostra", "Mam …", "Mam siostrę.", "Ich habe eine Schwester."],
      ["brat", "Mam …", "Mam brata.", "Ich habe einen Bruder."],
      ["pies", "Mam …", "Mam psa.", "Ich habe einen Hund."],
      ["telefon", "Mam nowy …", "Mam nowy telefon.", "Ich habe ein neues Handy."]
    ]
  },
  {
    id: "G06", after: "L06", title: "Instrumental: womit, mit wem, was du bist",
    explain: [
      "Drei häufige Situationen: Verkehrsmittel (jadę autobusem), „mit“ (z bratem) und Beruf oder Rolle nach być (jestem studentem).",
      "Weiblich -a → -ą. Männlich und sächlich → -em (nach k und g: -iem)."
    ],
    table: { head: ["Grundform", "Instrumental", "Beispiel"], say: [2], rows: [
      ["autobus", "autobusem", "Jadę autobusem."], ["pociąg", "pociągiem", "Jadę pociągiem."], ["siostra", "siostrą", "Idę z siostrą."],
      ["mleko", "mlekiem", "Kawa z mlekiem."], ["lekarz", "lekarzem", "On jest lekarzem."]] },
    drills: [
      ["autobus", "Jadę …", "Jadę autobusem.", "Ich fahre mit dem Bus."],
      ["tramwaj", "Jadę …", "Jadę tramwajem.", "Ich fahre mit der Straßenbahn."],
      ["pociąg", "Jadę …", "Jadę pociągiem.", "Ich fahre mit dem Zug."],
      ["brat", "Idę z …", "Idę z bratem.", "Ich gehe mit meinem Bruder."],
      ["siostra", "Idę z …", "Idę z siostrą.", "Ich gehe mit meiner Schwester."],
      ["mleko", "Kawa z …", "Kawa z mlekiem.", "Kaffee mit Milch."],
      ["cukier", "Herbata z …", "Herbata z cukrem.", "Tee mit Zucker."],
      ["{student/studentka}", "Jestem …", "Jestem {studentem/studentką}.", "Ich bin Student(in)."],
      ["lekarz", "On jest …", "On jest lekarzem.", "Er ist Arzt."],
      ["nauczycielka", "Ona jest …", "Ona jest nauczycielką.", "Sie ist Lehrerin."]
    ]
  },
  {
    id: "G07", after: "L06", title: "Lokativ: wo? (w / na)",
    explain: [
      "Nach w (in) und na (auf, bei) steht bei „wo?“ der Lokativ.",
      "Meist -e, und der Konsonant davor wird weich: Kraków → w Krakowie, kino → w kinie, sklep → w sklepie, teatr → w teatrze. Polska wird zu w Polsce.",
      "Einige auf -u: w domu. Weibliche auf -ca, -ża, -cza: -y oder -i (w pracy, na plaży)."
    ],
    table: { head: ["Grundform", "Wo?", "Deutsch"], say: [1], rows: [
      ["Kraków", "w Krakowie", "in Krakau"], ["Polska", "w Polsce", "in Polen"], ["dom", "w domu", "zu Hause"],
      ["praca", "w pracy", "bei der Arbeit"], ["sklep", "w sklepie", "im Laden"], ["plaża", "na plaży", "am Strand"]] },
    drills: [
      ["Kraków", "Mieszkam w …", "Mieszkam w Krakowie.", "Ich wohne in Krakau."],
      ["Warszawa", "Mieszkam w …", "Mieszkam w Warszawie.", "Ich wohne in Warschau."],
      ["Polska", "Jestem w …", "Jestem w Polsce.", "Ich bin in Polen."],
      ["Niemcy", "Mieszkam w …", "Mieszkam w Niemczech.", "Ich wohne in Deutschland."],
      ["dom", "Jestem w …", "Jestem w domu.", "Ich bin zu Hause."],
      ["praca", "Jestem w …", "Jestem w pracy.", "Ich bin bei der Arbeit."],
      ["sklep", "Jestem w …", "Jestem w sklepie.", "Ich bin im Laden."],
      ["kino", "Jestem w …", "Jestem w kinie.", "Ich bin im Kino."],
      ["plaża", "Leżę na …", "Leżę na plaży.", "Ich liege am Strand."],
      ["dworzec", "Jestem na …", "Jestem na dworcu.", "Ich bin am Bahnhof."]
    ]
  },
  {
    id: "G08", after: "L07", title: "Bewegung: iść / chodzić, jechać / jeździć",
    explain: [
      "Polnisch unterscheidet, ob du gerade unterwegs bist oder etwas regelmäßig tust.",
      "Jetzt, in eine Richtung: iść (zu Fuß), jechać (fahren). Regelmäßig oder allgemein: chodzić, jeździć.",
      "Typische Signalwörter für regelmäßig: codziennie, często, zawsze, czasami."
    ],
    table: { head: ["", "jetzt", "regelmäßig"], say: [1, 2], rows: [
      ["zu Fuß, ich", "idę", "chodzę"], ["zu Fuß, du", "idziesz", "chodzisz"],
      ["fahren, ich", "jadę", "jeżdżę"], ["fahren, du", "jedziesz", "jeździsz"]] },
    drills: [
      ["Idę do pracy.", "codziennie", "Codziennie chodzę do pracy.", "Ich gehe jeden Tag zur Arbeit."],
      ["Jadę do Krakowa.", "często", "Często jeżdżę do Krakowa.", "Ich fahre oft nach Krakau."],
      ["Idę na siłownię.", "dwa razy w tygodniu", "Dwa razy w tygodniu chodzę na siłownię.", "Zweimal pro Woche gehe ich ins Fitnessstudio."],
      ["Jadę autobusem.", "zawsze", "Zawsze jeżdżę autobusem.", "Ich fahre immer mit dem Bus."],
      ["Chodzę do kina.", "teraz", "Teraz idę do kina.", "Jetzt gehe ich ins Kino."],
      ["Jeżdżę do pracy.", "teraz", "Teraz jadę do pracy.", "Jetzt fahre ich zur Arbeit."],
      ["Idę do domu.", "mit dem Auto", "Jadę do domu.", "Ich fahre nach Hause."]
    ]
  },
  {
    id: "G09", after: "L08", title: "Vergangenheit bilden",
    explain: [
      "Einfacher als im Deutschen: Nimm den Infinitiv, streiche -ć und hänge -ł + Endung an. robić → robi- → robiłem.",
      "Die Endung zeigt Person und Geschlecht: ich (Mann) -łem, ich (Frau) -łam, du -łeś / -łaś, er -ł, sie -ła, sie (Mehrzahl) -li / -ły.",
      "Unregelmäßig, aber häufig: iść → szedłem / szłam (vollendet: poszedłem / poszłam), jeść → jadłem / jadłam, móc → mogłem / mogłam."
    ],
    table: { head: ["Person", "robić", "być"], say: [1, 2], rows: [
      ["ja (m / w)", "robiłem / robiłam", "byłem / byłam"], ["ty (m / w)", "robiłeś / robiłaś", "byłeś / byłaś"],
      ["on", "robił", "był"], ["ona", "robiła", "była"], ["my", "robiliśmy", "byliśmy"], ["oni", "robili", "byli"]] },
    drills: [
      ["Dziś pracuję.", "wczoraj", "Wczoraj {pracowałem/pracowałam}.", "Gestern habe ich gearbeitet."],
      ["Dziś czytam.", "wczoraj", "Wczoraj {czytałem/czytałam}.", "Gestern habe ich gelesen."],
      ["Dziś gotuję.", "wczoraj", "Wczoraj {gotowałem/gotowałam}.", "Gestern habe ich gekocht."],
      ["Dziś jestem w domu.", "wczoraj", "Wczoraj {byłem/byłam} w domu.", "Gestern war ich zu Hause."],
      ["Dziś mam czas.", "wczoraj", "Wczoraj {miałem/miałam} czas.", "Gestern hatte ich Zeit."],
      ["Dziś on pracuje.", "wczoraj", "Wczoraj on pracował.", "Gestern hat er gearbeitet."],
      ["Dziś ona gotuje.", "wczoraj", "Wczoraj ona gotowała.", "Gestern hat sie gekocht."],
      ["Dziś oni grają w piłkę.", "wczoraj", "Wczoraj oni grali w piłkę.", "Gestern haben sie Fußball gespielt."],
      ["Dziś idę do kina.", "wczoraj", "Wczoraj {poszedłem/poszłam} do kina.", "Gestern bin ich ins Kino gegangen.", "Unregelmäßig."],
      ["Dziś jem pizzę.", "wczoraj", "Wczoraj {jadłem/jadłam} pizzę.", "Gestern habe ich Pizza gegessen."],
      ["Dziś mogę.", "wczoraj", "Wczoraj {mogłem/mogłam}.", "Gestern konnte ich."],
      ["Dziś muszę pracować.", "wczoraj", "Wczoraj {musiałem/musiałam} pracować.", "Gestern musste ich arbeiten."]
    ]
  },
  {
    id: "G10", after: "L09", title: "Aspekt: unvollendet und vollendet",
    explain: [
      "Fast jedes Verb gibt es doppelt. Unvollendet (imperfektiv) beschreibt den Ablauf oder eine Gewohnheit. Vollendet (perfektiv) beschreibt eine einmalige, abgeschlossene Handlung.",
      "Der Trick fürs Sprechen: Die vollendete Form im Präsens ist automatisch Zukunft. zrobię heißt „ich werde (fertig) machen“. Ein „jetzt“ gibt es dafür nicht.",
      "Oft macht eine Vorsilbe das Verb vollendet (robić → zrobić, pisać → napisać). Manchmal ist es ein ganz anderes Wort (brać → wziąć, mówić → powiedzieć)."
    ],
    table: { head: ["unvollendet", "vollendet", "Deutsch"], say: [0, 1], rows: [
      ["robić", "zrobić", "machen"], ["pisać", "napisać", "schreiben"], ["czytać", "przeczytać", "lesen"],
      ["kupować", "kupić", "kaufen"], ["jeść", "zjeść", "essen"], ["dzwonić", "zadzwonić", "anrufen"],
      ["mówić", "powiedzieć", "sagen"], ["widzieć", "zobaczyć", "sehen"], ["brać", "wziąć", "nehmen"]] },
    drills: [
      ["Dziś piszę list.", "jutro (fertig)", "Jutro napiszę list.", "Morgen schreibe ich den Brief."],
      ["Dziś robię zakupy.", "jutro (fertig)", "Jutro zrobię zakupy.", "Morgen erledige ich den Einkauf."],
      ["Dziś czytam książkę.", "jutro (fertig)", "Jutro przeczytam książkę.", "Morgen lese ich das Buch (zu Ende)."],
      ["Dziś dzwonię do mamy.", "jutro", "Jutro zadzwonię do mamy.", "Morgen rufe ich Mama an."],
      ["Dziś kupuję bilet.", "jutro", "Jutro kupię bilet.", "Morgen kaufe ich das Ticket."],
      ["Dziś jem obiad.", "jutro", "Jutro zjem obiad.", "Morgen esse ich zu Mittag."],
      ["{Czytałem/Czytałam} książkę.", "zu Ende gelesen", "{Przeczytałem/Przeczytałam} książkę.", "Ich habe das Buch ausgelesen."],
      ["{Pisałem/Pisałam} list.", "fertig geschrieben", "{Napisałem/Napisałam} list.", "Ich habe den Brief fertig geschrieben."],
      ["Jutro zadzwonię.", "codziennie", "Codziennie dzwonię.", "Ich rufe jeden Tag an.", "Gewohnheit → unvollendet."],
      ["Mówię prawdę.", "gestern, einmal", "Wczoraj {powiedziałem/powiedziałam} prawdę.", "Gestern habe ich die Wahrheit gesagt."]
    ]
  },
  {
    id: "G11", after: "L09", title: "Zukunft: będę + Infinitiv",
    explain: [
      "Für unvollendete Verben (Ablauf, Dauer) bildest du die Zukunft mit będę + Infinitiv: będę pracować.",
      "będę allein heißt „ich werde sein“: Jutro będę w domu."
    ],
    table: { head: ["Person", "być (Zukunft)", "Beispiel"], say: [1, 2], rows: [
      ["ja", "będę", "będę pracować"], ["ty", "będziesz", "będziesz pracować"], ["on / ona", "będzie", "będzie pracować"],
      ["my", "będziemy", "będziemy pracować"], ["wy", "będziecie", "będziecie pracować"], ["oni", "będą", "będą pracować"]] },
    drills: [
      ["Pracuję.", "jutro", "Jutro będę pracować.", "Morgen werde ich arbeiten."],
      ["Uczę się.", "jutro", "Jutro będę się uczyć.", "Morgen werde ich lernen."],
      ["Jestem w domu.", "jutro", "Jutro będę w domu.", "Morgen bin ich zu Hause."],
      ["Ona gotuje.", "jutro", "Jutro ona będzie gotować.", "Morgen wird sie kochen."],
      ["Mamy czas.", "jutro", "Jutro będziemy mieć czas.", "Morgen werden wir Zeit haben."],
      ["Oni grają.", "jutro", "Jutro oni będą grać.", "Morgen werden sie spielen."],
      ["Pada.", "jutro", "Jutro będzie padać.", "Morgen wird es regnen."],
      ["Jest zimno.", "jutro", "Jutro będzie zimno.", "Morgen wird es kalt."]
    ]
  }
];

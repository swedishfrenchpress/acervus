// Pourquoi j’ai écrit PGP — Philip R. Zimmermann.
// Traduction française reproduite verbatim depuis le fichier fourni ; texte
// original sur philzimmermann.com/EN/essays/WhyIWrotePGP.html.
// Server component: renders only as prose inside the book page's .prose container.

export default function WhyIWrotePGP() {
  return (
    <>
      <p className="epigraph">
        Extrait du guide d’utilisation original de PGP de 1991, mis à jour en
        1999.
      </p>

      <blockquote>
        <p>
          « Quoi que vous fassiez, cela sera insignifiant, mais il est très
          important que vous le fassiez. »
          <br />
          — Mahatma Gandhi
        </p>
      </blockquote>

      <p>
        C’est personnel. C’est privé. Et cela ne regarde que vous. Vous
        planifiez peut-être une campagne politique, vous discutez de vos
        impôts ou vous vivez une liaison illicite. Ou peut-être
        communiquez-vous avec un dissident politique dans un pays répressif.
        Quoi qu’il en soit, vous ne voulez pas que vos courriels électroniques
        privés ou vos documents confidentiels soient lus par qui que ce soit
        d’autre. Il n’y a rien de mal à affirmer votre vie privée. La vie
        privée est aussi américaine que la tarte aux pommes et la
        Constitution.
      </p>

      <p>
        Le droit à la vie privée est implicite dans la Déclaration des droits
        (Bill of Rights). Mais lorsque la Constitution des États-Unis a été
        rédigée, les Pères fondateurs n’ont pas jugé nécessaire d’énoncer
        explicitement le droit à une conversation privée. Cela aurait été
        absurde. Il y a deux cents ans, toutes les conversations étaient
        privées. Si quelqu’un était à portée d’oreille, il suffisait d’aller
        derrière la grange pour avoir votre conversation. Personne ne
        pouvait écouter sans que vous le sachiez. Le droit à une conversation
        privée était un droit naturel, non seulement dans un sens
        philosophique, mais dans un sens physique, compte tenu de la
        technologie de l’époque.
      </p>

      <p>
        Mais avec l’avènement de l’ère de l’information, commençant par
        l’invention du téléphone, tout cela a changé. Désormais, la plupart
        de nos conversations se déroulent électroniquement. Cela permet à nos
        conversations les plus intimes d’être exposées à notre insu. Les
        appels téléphoniques mobiles peuvent être surveillés par quiconque
        dispose d’une radio. Le courriel électronique, envoyé via Internet,
        n’est pas plus sécurisé que les appels téléphoniques mobiles. Le
        courriel remplace rapidement le courrier postal, devenant la norme
        pour tous, et non plus la nouveauté qu’il était par le passé.
      </p>

      <p>
        Jusqu’à récemment, si le gouvernement voulait violer la vie privée
        des citoyens ordinaires, il devait engager certaines dépenses et
        efforts pour intercepter, ouvrir à la vapeur et lire le courrier
        papier. Ou il devait écouter et éventuellement transcrire les
        conversations téléphoniques vocales, du moins avant que la
        technologie de reconnaissance vocale automatique ne devienne
        disponible. Ce type de surveillance exigeante en main-d’œuvre n’était
        pas praticable à grande échelle. Cela ne se faisait que dans des cas
        importants lorsque cela en valait la peine. C’est comme attraper un
        poisson à la fois avec un hameçon et une ligne. Aujourd’hui, les
        courriels peuvent être systématiquement et automatiquement analysés
        pour y détecter des mots-clés intéressants, à une vaste échelle et
        sans détection. C’est comme la pêche au filet dérivant. Et la
        croissance exponentielle de la puissance informatique rend la même
        chose possible pour le trafic vocal.
      </p>

      <p>
        Peut-être pensez-vous que votre courriel est assez légitime pour que
        le chiffrement soit injustifié. Si vous êtes vraiment un citoyen
        respectueux des lois qui n’a rien à cacher, alors pourquoi
        n’envoyez-vous pas toujours votre courrier papier sur des cartes
        postales ? Pourquoi ne pas vous soumettre à des tests de dépistage de
        drogues sur demande ? Pourquoi exiger un mandat pour les
        perquisitions policières de votre maison ? Essayez-vous de cacher
        quelque chose ? Si vous cachez votre courrier dans des enveloppes,
        cela signifie-t-il que vous devez être un subversif, un trafiquant de
        drogue, ou peut-être un cinglé paranoïaque ? Les citoyens respectueux
        des lois ont-ils besoin de chiffrer leurs courriels ?
      </p>

      <p>
        Et si tout le monde croyait que les citoyens respectueux des lois
        devraient utiliser des cartes postales pour leur courrier ? Si un
        non-conformiste essayait d’affirmer sa vie privée en utilisant une
        enveloppe pour son courrier, cela attirerait les soupçons.
        Peut-être que les autorités ouvriraient son courrier pour voir ce
        qu’il cache. Heureusement, nous ne vivons pas dans ce genre de monde,
        car tout le monde protège la majeure partie de son courrier avec des
        enveloppes. Ainsi, personne n’attire les soupçons en affirmant sa vie
        privée avec une enveloppe. Il y a une sécurité dans le nombre. Par
        analogie, il serait bon que tout le monde utilise routinièrement le
        chiffrement pour tous ses courriels, innocents ou non, afin que
        personne n’attire les soupçons en affirmant la vie privée de ses
        courriels par le chiffrement. Considérez cela comme une forme de
        solidarité.
      </p>

      <p>
        Le projet de loi du Sénat 266, une loi omnibus anticrime de 1991,
        contenait une mesure troublante. Si cette résolution non contraignante
        était devenue une loi réelle, elle aurait forcé les fabricants
        d’équipements de communication sécurisés à insérer des « portes
        dérobées » spéciales dans leurs produits, afin que le gouvernement
        puisse lire les messages chiffrés de n’importe qui. Elle stipulait :
        « Il est l’avis du Congrès que les fournisseurs de services de
        communications électroniques et les fabricants d’équipements de
        services de communications électroniques doivent s’assurer que les
        systèmes de communication permettent au gouvernement d’obtenir le
        contenu en clair des communications vocales, de données et autres,
        lorsque cela est dûment autorisé par la loi. » C’est ce projet de loi
        qui m’a conduit à publier PGP électroniquement et gratuitement cette
        année-là, peu de temps avant que la mesure ne soit rejetée après des
        protestations vigoureuses de la part des libertariens civils et des
        groupes industriels.
      </p>

      <p>
        Le Communications Assistance for Law Enforcement Act (CALEA) de 1994
        a obligé les compagnies téléphoniques à installer des ports d’écoute
        à distance dans leurs commutateurs numériques de bureau central,
        créant ainsi une nouvelle infrastructure technologique pour l’écoute
        téléphonique « point-and-click », de sorte que les agents fédéraux
        n’aient plus à sortir et à fixer des pinces crocodiles sur les lignes
        téléphoniques. Désormais, ils pourront s’asseoir dans leur quartier
        général à Washington et écouter vos appels téléphoniques. Bien sûr,
        la loi exige toujours une ordonnance du tribunal pour une écoute
        téléphonique. Mais tandis que les infrastructures technologiques
        peuvent persister pendant des générations, les lois et les
        politiques peuvent changer du jour au lendemain. Une fois qu’une
        infrastructure de communication optimisée pour la surveillance est
        solidement établie, un changement des conditions politiques peut
        conduire à un abus de ce nouveau pouvoir. Les conditions politiques
        peuvent changer avec l’élection d’un nouveau gouvernement, ou
        peut-être plus brutalement suite à l’attentat à la bombe contre un
        bâtiment fédéral.
      </p>

      <p>
        Un an après l’adoption du CALEA, le FBI a divulgué des plans
        obligeant les compagnies téléphoniques à intégrer dans leur
        infrastructure la capacité d’écouter simultanément 1 % de tous les
        appels téléphoniques dans toutes les grandes villes américaines.
        Cela représenterait une augmentation de plus de mille fois par
        rapport aux niveaux précédents du nombre de téléphones pouvant être
        mis sur écoute. Les années précédentes, il n’y avait qu’environ
        mille écoutes téléphoniques ordonnées par un tribunal aux États-Unis
        par an, tous niveaux fédéral, étatique et local confondus. Il est
        difficile de voir comment le gouvernement pourrait même employer
        assez de juges pour signer assez d’ordonnances d’écoute pour mettre
        sur écoute 1 % de tous nos appels téléphoniques, sans parler
        d’embaucher assez d’agents fédéraux pour s’asseoir et écouter tout ce
        trafic en temps réel. La seule façon plausible de traiter cette
        quantité de trafic est une application orwellienne massive de la
        technologie de reconnaissance vocale automatique pour tout filtrer, à
        la recherche de mots-clés intéressants ou de la voix d’un locuteur
        particulier. Si le gouvernement ne trouve pas la cible dans le
        premier échantillon de 1 %, les écoutes peuvent être déplacées vers
        un autre 1 % jusqu’à ce que la cible soit trouvée, ou jusqu’à ce que
        la ligne téléphonique de tout le monde ait été vérifiée pour un
        trafic subversif. Le FBI a déclaré qu’il avait besoin de cette
        capacité pour planifier l’avenir. Ce plan a suscité une telle
        indignation qu’il a été rejeté par le Congrès. Mais le simple fait
        que le FBI ait même demandé ces larges pouvoirs est révélateur de son
        agenda.
      </p>

      <p>
        Les progrès technologiques ne permettront pas le maintien du statu
        quo en matière de vie privée. Le statu quo est instable. Si nous ne
        faisons rien, les nouvelles technologies donneront au gouvernement de
        nouvelles capacités de surveillance automatique dont Staline
        n’aurait jamais pu rêver. La seule façon de maintenir la ligne de
        défense de la vie privée à l’ère de l’information est la
        cryptographie forte.
      </p>

      <p>
        Vous n’avez pas besoin de vous méfier du gouvernement pour vouloir
        utiliser la cryptographie. Votre entreprise peut être mise sur écoute
        par des rivaux commerciaux, le crime organisé ou des gouvernements
        étrangers. Plusieurs gouvernements étrangers, par exemple, admettent
        utiliser leur renseignement d’origine électromagnétique contre des
        entreprises d’autres pays pour donner à leurs propres entreprises un
        avantage concurrentiel. Ironiquement, les restrictions du
        gouvernement des États-Unis sur la cryptographie dans les années
        1990 ont affaibli les défenses des entreprises américaines contre le
        renseignement étranger et le crime organisé.
      </p>

      <p>
        Le gouvernement sait quel rôle pivot la cryptographie est destinée à
        jouer dans la relation de pouvoir avec son peuple. En avril 1993,
        l’administration Clinton a dévoilé une nouvelle initiative audacieuse
        en matière de politique de chiffrement, qui était en développement à
        la National Security Agency (NSA) depuis le début de l’administration
        Bush. La pièce maîtresse de cette initiative était un dispositif de
        chiffrement construit par le gouvernement, appelé la puce Clipper,
        contenant un nouvel algorithme de chiffrement classifié de la NSA.
        Le gouvernement a essayé d’encourager l’industrie privée à
        l’intégrer dans tous ses produits de communication sécurisés, tels
        que les téléphones sécurisés, les télécopieurs sécurisés, etc.
        AT&amp;T a intégré Clipper dans ses produits vocaux sécurisés. Le
        hic : au moment de la fabrication, chaque puce Clipper est chargée
        avec sa propre clé unique, et le gouvernement en conserve une copie,
        placée sous séquestre. Ne vous inquiétez pas, cependant — le
        gouvernement promet qu’il n’utilisera ces clés pour lire votre trafic
        que « lorsque dûment autorisé par la loi ». Bien sûr, pour rendre
        Clipper complètement efficace, la prochaine étape logique serait
        d’interdire les autres formes de cryptographie.
      </p>

      <p>
        Le gouvernement a initialement affirmé que l’utilisation de Clipper
        serait volontaire, que personne ne serait forcé de l’utiliser à la
        place d’autres types de cryptographie. Mais la réaction du public
        contre la puce Clipper a été forte, plus forte que ce que le
        gouvernement avait anticipé. L’industrie informatique a proclamé
        monolithiquement son opposition à l’utilisation de Clipper. Le
        directeur du FBI, Louis Freeh, a répondu à une question lors d’une
        conférence de presse en 1994 en disant que si Clipper ne parvenait
        pas à gagner le soutien du public et que les écoutes du FBI étaient
        exclues par une cryptographie non contrôlée par le gouvernement, son
        bureau n’aurait d’autre choix que de chercher un recours législatif.
        Plus tard, à la suite de la tragédie d’Oklahoma City, M. Freeh a
        témoigné devant le Comité judiciaire du Sénat que la disponibilité
        publique d’une cryptographie forte devait être restreinte par le
        gouvernement (bien que personne n’ait suggéré que la cryptographie
        avait été utilisée par les poseurs de bombes).
      </p>

      <p>
        Le gouvernement a un bilan qui n’inspire pas confiance quant à sa
        promesse de ne jamais abuser de nos libertés civiles. Le programme
        COINTELPRO du FBI a ciblé des groupes qui s’opposaient aux politiques
        gouvernementales. Ils ont espionné le mouvement anti-guerre et le
        mouvement des droits civiques. Ils ont mis sur écoute le téléphone de
        Martin Luther King. Nixon avait sa liste d’ennemis. Puis il y a eu le
        scandale du Watergate. Plus récemment, le Congrès a tenté ou réussi à
        adopter des lois restreignant nos libertés civiles sur Internet.
        Certains éléments de la Maison Blanche de Clinton ont collecté des
        dossiers confidentiels du FBI sur des fonctionnaires républicains,
        concevablement pour une exploitation politique. Et certains
        procureurs trop zélés ont montré une volonté d’aller au bout du monde
        pour exposer les indiscrétions sexuelles d’ennemis politiques. À
        aucun moment au cours du siècle dernier la méfiance du public envers
        le gouvernement n’a été aussi largement répartie sur tout le spectre
        politique qu’elle ne l’est aujourd’hui.
      </p>

      <p>
        Tout au long des années 1990, j’ai estimé que si nous voulions
        résister à cette tendance troublante du gouvernement à interdire la
        cryptographie, une mesure que nous pouvons appliquer est d’utiliser
        la cryptographie autant que nous le pouvons maintenant, tant qu’elle
        est encore légale. Lorsque l’utilisation d’une cryptographie forte
        deviendra populaire, il sera plus difficile pour le gouvernement de
        la criminaliser. Par conséquent, utiliser PGP est bon pour préserver
        la démocratie. Si la vie privée est interdite, seuls les hors-la-loi
        auront la vie privée.
      </p>

      <p>
        Il semble que le déploiement de PGP ait fonctionné, accompagné
        d’années de protestations publiques régulières et de pressions de
        l’industrie pour assouplir les contrôles à l’exportation. Dans les
        derniers mois de 1999, l’administration Clinton a annoncé un
        changement radical de politique d’exportation pour la technologie
        cryptographique. Ils ont essentiellement jeté tout le régime de
        contrôle des exportations. Maintenant, nous sommes enfin en mesure
        d’exporter une cryptographie forte, sans limites supérieures de
        puissance. Cela a été une longue lutte, mais nous avons enfin gagné,
        du moins sur le front du contrôle des exportations aux États-Unis.
        Maintenant, nous devons poursuivre nos efforts pour déployer une
        cryptographie forte, afin d’atténuer les effets des efforts de
        surveillance croissants sur Internet par divers gouvernements. Et
        nous devons toujours ancrer notre droit de l’utiliser au niveau
        national malgré les objections du FBI.
      </p>

      <p>
        PGP donne aux gens le pouvoir de prendre leur vie privée en main. Il
        y a eu un besoin social croissant pour cela. C’est pourquoi je l’ai
        écrit.
      </p>

      <p>
        Philip R. Zimmermann
        <br />
        Boulder, Colorado
        <br />
        Juin 1991 (mis à jour en 1999)
      </p>
    </>
  );
}

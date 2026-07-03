// Méditations sur les cauchemars cypherpunks — Michael Goldstein, 24 décembre 2014.
// Traduction française reproduite verbatim depuis le fichier fourni ; texte
// original sur nakamotoinstitute.org/mempool/meditations-on-cypherpunk-nightmares/.
// Server component: renders only as prose inside the book page's .prose container.

export default function MeditationsOnCypherpunkNightmares() {
  return (
    <>
      <blockquote>
        <p>Certaines choses dépendent de nous, d’autres non.</p>
        <p>
          Épictète, <em>Manuel</em>
        </p>
      </blockquote>

      <h2>L’anarchie cryptographique se propage</h2>
      <p>
        Dans son classique « Manifeste de l’anarchiste cryptographique »,
        Timothy C. May a offert une vision de l’avenir qui présente à la
        société de nombreux défis à relever, grâce à la cryptographie à clé
        publique. Un défi particulièrement intéressant est le marché anonyme
        de l’information :
      </p>
      <blockquote>
        <p>
          L’État tentera bien sûr de ralentir ou d’arrêter la propagation de
          cette technologie, invoquant des préoccupations de sécurité
          nationale, l’utilisation de la technologie par les trafiquants de
          drogue et les fraudeurs fiscaux, et la crainte d’une désintégration
          de la société. Beaucoup de ces préoccupations seront fondées ;
          l’anarchie cryptographique permettra aux secrets nationaux d’être
          librement échangés et permettra le commerce de matériaux illicites
          et volés. Un marché informatique anonyme rendra même possibles des
          marchés abominables pour les assassinats et l’extorsion. Divers
          éléments criminels et étrangers seront des utilisateurs actifs de
          CryptoNet.{" "}
          <strong>
            Mais cela n’arrêtera pas la propagation de l’anarchie
            cryptographique.
          </strong>
        </p>
        <p>
          Tout comme la technologie de l’imprimerie a modifié et réduit le
          pouvoir des guildes médiévales et de la structure de pouvoir
          social, de même les méthodes cryptologiques modifieront
          fondamentalement la nature des entreprises et de l’ingérence
          gouvernementale dans les transactions économiques.{" "}
          <strong>
            Combinée aux marchés de l’information émergents, l’anarchie
            cryptographique créera un marché liquide pour tout matériel
            pouvant être mis en mots et en images.
          </strong>{" "}
          Et tout comme une invention apparemment mineure comme le fil de
          fer barbelé a rendu possible la clôture de vastes ranchs et
          fermes, modifiant ainsi à jamais les concepts de terre et de
          droits de propriété dans l’Ouest frontalier, de même la découverte
          apparemment mineure issue d’une branche obscure des mathématiques
          deviendra la pince coupante qui démantèlera le fil de fer barbelé
          entourant la propriété intellectuelle.
        </p>
      </blockquote>
      <p>Deux leçons ici :</p>
      <ol>
        <li>Toutes les informations seront sur le marché.</li>
        <li>Ce marché existera, que vous le vouliez ou non.</li>
      </ol>
      <p>
        Et par <em>sera</em>, j’entends <em>est déjà</em>.
      </p>
      <p>
        Nous avons déjà vu WikiLeaks et Edward Snowden ouvrir les vannes des
        secrets d’État (qui incluent vos secrets). Nous avons également vu
        Bitcoin permettre le marché du « Fappening » de photos de célébrités
        nues.
      </p>
      <p>
        Et maintenant, un site web promu par le compte Twitter de WikiLeaks
        veut passer à la vitesse supérieure. Slur.io promet d’être WikiLeaks
        2.0 :
      </p>
      <blockquote>
        <p>
          Slur est une place de marché open source, décentralisée et anonyme
          pour la vente d’informations secrètes en échange de bitcoin. Slur
          est écrit en C et fonctionne sur le réseau Tor avec des
          transactions bitcoin via libbitcoin. Les acheteurs et les vendeurs
          sont entièrement anonymes et il n’y a aucune restriction sur les
          données mises aux enchères. Il n’y a aucun frais pour acheter ou
          vendre sur la place de marché Slur, sauf en cas de litige, où une
          somme symbolique est versée à des bénévoles.
        </p>
      </blockquote>
      <p>
        Pour tout, des secrets commerciaux aux secrets d’État, en passant
        par les exploits zero-day jusqu’aux « bases de données complètes de
        sites de médias sociaux comme Facebook », il y aura un prix en
        Bitcoin.
      </p>
      <p>
        <em>
          Je recommanderais à quiconque vivant en 2014 non seulement de
          supposer que ses secrets seront divulgués, mais de vivre comme
          s’ils l’avaient déjà été.
        </em>
      </p>

      <h2>Sagesse ancienne</h2>
      <p>
        Faire face à cette idée n’est pas facile, car nous avons tous dit
        dans le passé quelque chose que nous regrettons ou quelque chose que
        nous ne destinions pas à la consommation publique. Ces problèmes,
        cependant, ne sont pas nouveaux avec Internet. Au contraire, Internet
        nous permet de nous débarrasser des illusions passées de vie privée
        qui étaient largement incontestées auparavant. Dans cet esprit, nous
        pouvons nous tourner vers les anciens Stoïciens pour un conseil
        intemporel.
      </p>

      <h3>Sur le changement</h3>
      <blockquote>
        <p>L’univers est changement : la vie est jugement.</p>
        <p>
          Marc Aurèle, <em>Pensées pour moi-même</em> (Livre IV, 3.4)
        </p>
      </blockquote>
      <p>
        Si nous prenons les mots de Tim May et les données empiriques au
        sérieux, l’anarchie cryptographique telle qu’il la décrit est en
        train de se produire et continue de se produire. La technologie est
        une arme à double tranchant en ce que tout le monde, des criminels
        aux gens vertueux, peut l’employer pour atteindre ses fins.
        Cependant, cela doit simplement être accepté comme un fait de la
        nature, car souhaiter un moyen de l’arrêter est utopique au mieux et
        totalitaire au pire. Lorsque Cody Wilson et Defense Distributed ont
        donné au monde le Liberator, nous avons été forcés de faire face au
        fait que la technologie n’est pas démocratique. Il n’y a pas eu de
        vote pour savoir si les armes imprimées en 3D, la cryptographie à
        clé publique, Bitcoin ou BitTorrent devaient exister. Chacun était
        simplement le produit de l’entrepreneuriat de Cody Wilson, Whitfield
        Diffie &amp; Martin Hellman, Satoshi Nakamoto et Bram Cohen. Ils sont
        venus à l’existence, et nous devons faire face aux conséquences. Si
        les mauvaises personnes peuvent utiliser ces technologies, nous
        devons les utiliser encore mieux.
      </p>
      <p>
        Le monde change, et ce n’est ni bien ni mal. Seules nos perceptions
        et nos réactions comptent.
      </p>

      <h3>Sur le maintien d’un esprit vertueux</h3>
      <blockquote>
        <p>
          [D]ans la suite de vos pensées, vous devez éviter tout ce qui est
          fortuit ou sans but, et plus particulièrement tout ce qui est
          indiscret ou malveillant. Entraînez-vous à ne penser qu’à des
          pensées telles que, en réponse à la question soudaine
          « Qu’y a-t-il dans votre esprit maintenant ? », vous puissiez dire
          avec une franchise immédiate quoi que ce soit, ceci ou cela : et
          ainsi votre réponse peut donner la preuve directe que toutes vos
          pensées sont droites et bienveillantes, les pensées d’un être
          social qui n’a aucun égard pour les fantaisies du plaisir ou de
          l’indulgence plus large, pour la rivalité, la malice, la
          suspicion, ou quoi que ce soit d’autre dont on rougirait
          d’admettre que c’était dans son esprit.
        </p>
        <p>
          Marc Aurèle, <em>Pensées pour moi-même</em> (Livre III, 4.2)
        </p>
      </blockquote>
      <p>
        La cryptographie forte est excellente pour protéger les informations
        des regards indiscrets, mais utiliser la cryptographie est une
        question de gestion des risques plutôt que de trouver des panacées.
        S’attendre à ce que même les informations chiffrées ou anonymisées
        restent dans cet état pour toujours, même si c’est probable, est
        problématique, ne serait-ce que parce que cela nous trompe en nous
        faisant cultiver de mauvaises habitudes et en étant trop risqués
        quant à l’endroit où nous laissons nos esprits et nos actions nous
        mener. La communication non chiffrée est comme l’envoi d’une carte
        postale, comme l’a décrit Phil Zimmermann, entièrement lisible par
        quiconque la traverse.
      </p>
      <p>
        Une solution à cela est de viser à être vertueux dans la pensée et
        l’action en premier lieu, de sorte que toutes les communications,
        publiques et privées, restent fidèles à vos objectifs et principes.
        Cela ne rendrait pas la divulgation de vos secrets agréable, mais
        minimiserait plutôt l’exposition aux risques de réputation. Et même
        si ce n’est pas le cas, vous serez resté fidèle à vous-même, et
        c’est ce qui compte le plus.
      </p>

      <h3>Sur les amitiés et la confiance</h3>
      <blockquote>
        <p>
          [S]i vous considérez comme un ami un homme en qui vous n’avez pas
          autant confiance qu’en vous-même, vous vous trompez grandement et
          vous ne comprenez pas suffisamment ce que signifie la vraie
          amitié. En effet, je voudrais que vous discutiez de tout avec un
          ami ; mais avant tout, discutez de l’homme lui-même. Quand
          l’amitié est établie, vous devez faire confiance ; avant que
          l’amitié ne soit formée, vous devez porter un jugement. Ceux-là
          mettent vraiment la charrue avant les bœufs et confondent leurs
          devoirs, qui, violant les règles de Théophraste, jugent un homme
          après l’avoir fait leur ami, au lieu de le faire leur ami après
          l’avoir jugé. Réfléchissez longtemps pour savoir si vous devez
          admettre une personne donnée dans votre amitié ; mais lorsque vous
          avez décidé de l’admettre, accueillez-la de tout votre cœur et de
          toute votre âme. Parlez aussi hardiment avec lui qu’avec
          vous-même.
        </p>
        <p>Sénèque, « De la vraie et de la fausse amitié »</p>
      </blockquote>
      <p>
        Comme je l’ai dit plus haut, la cryptographie forte n’est pas une
        panacée. Même le chiffrement de bout en bout le plus fort ne vous
        protège pas contre la fuite d’informations depuis l’autre extrémité.
        Il est donc important de connaître et de faire confiance à ceux avec
        qui vous communiquez, à la fois sur le plan de la vertu et des
        capacités de sécurité. Faire confiance à la communication
        cryptographique signifie avoir confiance en votre pair et comprendre
        ses vulnérabilités. Les gens sympas peuvent aussi être piratés.
      </p>
      <p>
        Par conséquent, faites les meilleurs amis. Construisez des relations
        fortes et fiables avec d’autres individus, et connaissez les limites
        de ces relations. Signez les clés, vérifiez les empreintes
        digitales, et surtout, sachez quelle valeur vous vous donnez
        vraiment les uns aux autres. Ne laissez pas les médias sociaux
        dévaluer le mot ami, de peur que vous ne fraternisiez avec des
        escrocs.
      </p>

      <h2>Conclusion</h2>
      <p>
        Il n’y a jamais eu une telle chose que la vie privée. Internet a
        simplement rendu le fait clair. La vie privée peut et doit être
        construite, mais elle ne sera jamais parfaite. Se protéger des
        dangers de l’anarchie cryptographique nécessite de l’embrasser
        encore plus pleinement et d’intérioriser et de pratiquer les vertus
        qui ont aidé les grands hommes à traverser les tempêtes de la vie
        depuis l’antiquité.
      </p>

      <h2>Addendum (13 février 2015)</h2>
      <p>
        Lorsque cet article a été écrit, les gens qualifiaient à juste titre
        Slur.io de « vaporware » (produit annoncé mais inexistant). À
        l’époque, le dépôt GitHub du projet était vide, et il l’est encore
        aujourd’hui (pourtant, ils ont réussi à escroquer plus de 3 BTC à
        des gens). Cet article n’était pas destiné à porter sur Slur.io en
        particulier, mais sur la menace et l’inévitabilité de ces
        technologies. En effet, en un clin d’œil, le cauchemar est devenu
        réalité. Un peu plus d’un mois plus tard, le 28 janvier, un projet
        unSYSTEM appelé Darkleaks a été dévoilé, avec un code fonctionnel.
        Le 11 février, le soi-disant programmeur principal de Silk Road 2.0
        a annoncé une enchère Darkleaks pour pratiquement la totalité des
        données que le backend du site avait à offrir, des tables
        d’utilisateurs au code source. Et les fuites de données initiales
        semblent authentiques. Comme l’a déclaré le pseudonyme Zozan Cudi
        dans l’annonce de Darkleaks : « Les gants sont ôtés. La révolte a
        commencé. »
      </p>
      <p>
        Pour un aperçu approfondi de cette fuite jusqu’à présent, voir « The
        Silk Road 2.0 Database Is Up For Grabs in the First Darkleaks
        Auction » par Andrea Castillo.
      </p>

      <h2>Lectures et actions suggérées</h2>

      <h3>Littérature stoïcienne</h3>
      <p>
        La sagesse stoïcienne a guidé les grands hommes tout au long de
        l’histoire et continuera de le faire.
      </p>
      <ul>
        <li>
          <em>Pensées pour moi-même</em> de Marc Aurèle (les traductions dans
          ce post sont issues de l’édition Penguin Classics)
        </li>
        <li>
          <em>Lettres morales à Lucilius</em> de Sénèque
        </li>
        <li>
          <em>Manuel</em> d’Épictète
        </li>
        <li>
          <em>L’Obstacle est le chemin</em> de Ryan Holiday
        </li>
      </ul>

      <h3>Les Cypherpunks et l’anarchie cryptographique</h3>
      <p>
        Plus vous comprenez l’anarchie cryptographique, mieux vous pourrez
        affronter l’avenir.
      </p>
      <ul>
        <li>Institut Satoshi Nakamoto</li>
        <li>Archives de la liste de diffusion Cypherpunk</li>
        <li>Essais, articles et tutoriels concis de Nick Szabo</li>
        <li>
          <em>This Machine Kills Secrets</em> par Andy Greenberg
        </li>
        <li>
          <em>Crypto</em> par Steven Levy
        </li>
      </ul>

      <h3>Tutoriels</h3>
      <p>
        Les amis, ne laissez pas les amis ne pas comprendre les bases de la
        sécurité GPG et Bitcoin.
      </p>
      <ul>
        <li>« Please To PGP (Guide for Linux, OS X, Windows) » par Pete Dushenski</li>
        <li>
          « On Making High-Entropy Paper Wallets » par Pete Dushenski
          (rendez-le encore plus facile avec Pierre Rochard et mon Entropic)
        </li>
        <li>
          « Biting Into The WoT Elephant (And IRC Nicknames) » par Pete
          Dushenski
        </li>
        <li>
          « The Six Pillars for Surviving in Computer Times » par Pete
          Dushenski
        </li>
      </ul>

      <h3>Régimes d’information et manipulation des médias</h3>
      <p>
        Tout ce que vous lisez est probablement un mensonge. Gardez votre
        rapport signal/bruit aussi élevé que possible.
      </p>
      <ul>
        <li>
          <em>Trust Me, I’m Lying</em> de Ryan Holiday
        </li>
        <li>
          <em>Fooled by Randomness</em> de Nassim Nicholas Taleb
        </li>
      </ul>
    </>
  );
}

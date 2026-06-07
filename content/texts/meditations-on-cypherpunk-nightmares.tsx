// Meditations on Cypherpunk Nightmares — Michael Goldstein, 24 December 2014.
// Reproduced verbatim from nakamotoinstitute.org/mempool/meditations-on-cypherpunk-nightmares/.
// Server component: renders only as prose inside the book page's .prose container.

export default function MeditationsOnCypherpunkNightmares() {
  return (
    <>
      <blockquote>
        <p>Some things are in our control and others not.</p>
        <p>Epictetus, <em>The Enchiridion</em></p>
      </blockquote>

      <h2>Crypto Anarchy Spreads</h2>
      <p>
        In his classic “Crypto Anarchist Manifesto,” Timothy C. May offered a
        vision of the future that offers society plenty of challenges to grapple
        with, thanks to public-key cryptography. A particularly interesting
        challenge is the anonymous information market:
      </p>
      <blockquote>
        <p>
          The State will of course try to slow or halt the spread of this
          technology, citing national security concerns, use of the technology by
          drug dealers and tax evaders, and fears of societal disintegration. Many
          of these concerns will be valid; crypto anarchy will allow national
          secrets to be trade freely and will allow illicit and stolen materials to
          be traded. An anonymous computerized market will even make possible
          abhorrent markets for assassinations and extortion. Various criminal and
          foreign elements will be active users of CryptoNet.{" "}
          <strong>But this will not halt the spread of crypto anarchy.</strong>
        </p>
        <p>
          Just as the technology of printing altered and reduced the power of
          medieval guilds and the social power structure, so too will cryptologic
          methods fundamentally alter the nature of corporations and of government
          interference in economic transactions.{" "}
          <strong>
            Combined with emerging information markets, crypto anarchy will create a
            liquid market for any and all material which can be put into words and
            pictures.
          </strong>{" "}
          And just as a seemingly minor invention like barbed wire made possible
          the fencing-off of vast ranches and farms, thus altering forever the
          concepts of land and property rights in the frontier West, so too will the
          seemingly minor discovery out of an arcane branch of mathematics come to
          be the wire clippers which dismantle the barbed wire around intellectual
          property.
        </p>
      </blockquote>
      <p>Two lessons here:</p>
      <ol>
        <li>All information will be on the market.</li>
        <li>This market will exist whether you like it or not.</li>
      </ol>
      <p>
        Also, by <em>will</em>, I mean <em>already</em>.
      </p>
      <p>
        We have already seen WikiLeaks and Edward Snowden open the floodgates for
        State secrets (which include your secrets). We have also already seen
        Bitcoin enable the Fappening marketplace of celebrity nude pictures.
      </p>
      <p>
        And now a website promoted by WikiLeaks’s Twitter account wants to take it
        to the next level. Slur.io promises to be WikiLeaks 2.0:
      </p>
      <blockquote>
        <p>
          Slur is an open source, decentralized and anonymous marketplace for the
          selling of secret information in exchange for bitcoin. Slur is written in
          C and operates over the Tor network with bitcoin transactions through
          libbitcoin. Both buyers and sellers are fully anonymous and there are no
          restrictions on the data that is auctioned. There is no charge to buy or
          sell on the Slur marketplace except in the case of a dispute, where a
          token sum is paid to volunteers.
        </p>
      </blockquote>
      <p>
        For everything from trade secrets to State secrets to zero-day exploits to
        “the complete databases of social media sites like facebook,” there will be
        a price in Bitcoin.
      </p>
      <p>
        <em>
          I would recommend that anyone alive in 2014 not only assume that their
          secrets will be leaked, but live as though they have already been leaked.
        </em>
      </p>

      <h2>Ancient Wisdom</h2>
      <p>
        Coping with this idea is not easy, as we all have said something in the past
        we regret or something we did not intend for public consumption. These
        problems, however, are not made new by the Internet. Instead, the Internet
        allows us to rid ourselves of past illusions of privacy that were largely
        unchallenged before. With this in mind, we can look to the ancient Stoics
        for timeless advice.
      </p>

      <h3>On change</h3>
      <blockquote>
        <p>The universe is change: life is judgement.</p>
        <p>Marcus Aurelius, <em>Meditations</em> (Book IV, 3.4)</p>
      </blockquote>
      <p>
        If we take Tim May’s words, and empirical data, seriously, crypto-anarchy as
        he describes it is happening and continues to happen. Technology is a
        double-edged sword in that everyone from criminals to people of virtue get
        to employ it to suit their ends. However, this should just be taken as a
        fact of nature, as wishing for a way to stop it is utopian at best and
        totalitarian at worst. When Cody Wilson and Defense Distributed gave the
        world the Liberator, we were forced to face the fact that technology is not
        democratic. There was no vote for whether 3D printed guns, public-key
        cryptography, Bitcoin, or BitTorrent should exist. Each was just the product
        of entrepreneurship by Cody Wilson, Whitfield Diffie &amp; Martin Hellman,
        Satoshi Nakamoto, and Bram Cohen. They came into existence, and we must deal
        with the consequences. If bad people can use these technologies, we must use
        them even better.
      </p>
      <p>
        The world changes, and that is not good or bad. Only our perceptions and
        reactions matter.
      </p>

      <h3>On Maintaining a Virtuous Mind</h3>
      <blockquote>
        <p>
          [I]n the sequence of your thoughts you must avoid all that is casual or
          aimless, and most particularly anything prying or malicious. Train
          yourself to think only those thoughts such that in answer to the sudden
          question “What is in your mind now?” you could say with immediate frankness
          whatever it is, this or that: and so your answer can give direct evidence
          that all your thoughts are straightforward and kindly, the thoughts of a
          social being who has no regard for the fancies of pleasure or wider
          indulgence, for rivalry, malice, suspicion, or anything else that one would
          blush to admit was in one’s mind.
        </p>
        <p>Marcus Aurelius, <em>Meditations</em> (Book III, 4.2)</p>
      </blockquote>
      <p>
        Strong cryptography is great at protecting information from prying eyes, but
        using cryptography is a matter of risk management rather than finding
        panaceas. Expecting even encrypted or anonymized information to remain in
        that state forever, even if likely, is problematic if not only for tricking
        us into cultivating bad habits and being too risky with where we let our
        minds and actions take us. Unencrypted communication is like sending a
        postcard, as Phil Zimmermann described it, completely readable to anyone it
        passes.
      </p>
      <p>
        A solution to this is to aim to be virtuous in thought and action in the
        first place, such that all communications, public and private, remain true
        to your goals and principles. This would not make the leaking of your
        secrets enjoyable, but rather minimize the exposure to downside risks to
        your reputation. And even if that is not the case, you will have stayed true
        to yourself, and that is what matters most.
      </p>

      <h3>On Friendships and Trust</h3>
      <blockquote>
        <p>
          [I]f you consider any man a friend whom you do not trust as you trust
          yourself, you are mightily mistaken and you do not sufficiently understand
          what true friendship means. Indeed, I would have you discuss everything
          with a friend; but first of all discuss the man himself. When friendship
          is settled, you must trust; before friendship is formed, you must pass
          judgment. Those persons indeed put last first and confound their duties,
          who, violating the rules of Theophrastus, judge a man after they have made
          him their friend, instead of making him their friend after they have judged
          him. Ponder for a long time whether you shall admit a given person to your
          friendship; but when you have decided to admit him, welcome him with all
          your heart and soul. Speak as boldly with him as with yourself.
        </p>
        <p>Seneca, “On True and False Friendship”</p>
      </blockquote>
      <p>
        As I said above, strong cryptography is not a panacea. Even the strongest
        end-to-end encryption does not protect you from information leaking from the
        other end. It is therefore important to know and trust who you are
        communicating, both on virtue and on security capabilities. To trust in
        cryptographic communication should be to have confidence in your peer and to
        understand their vulnerabilities. Nice people can be hacked, too.
      </p>
      <p>
        Therefore, make the best friends. Build strong, trusted relationships with
        other individuals, and know the limits of those relationships. Sign keys,
        verify fingerprints, and most importantly, know what value you truly give
        one another. Do not let social media devalue the word friend, lest you
        fraternize with scammers.
      </p>

      <h2>Conclusion</h2>
      <p>
        There was never such a thing as privacy. The Internet just made the fact
        clear. Privacy can and should be constructed, but it will never be
        perfected. Protecting ourselves from the dangers of crypto-anarchy requires
        embracing it even more fully and internalizing and practicing the virtues
        that have helped great men weather the storms of life since antiquity.
      </p>

      <h2>Addendum (February 13, 2015)</h2>
      <p>
        When this article was written, people rightfully referred to Slur.io as
        vaporware. At the time, the project’s GitHub repository was empty, and it
        remains so today (yet they still managed to scam people out over 3 BTC).
        This article was not intended to be about Slur.io in particular, but the
        threat and inevitability of these technologies. Indeed, in the blink of an
        eye, the nightmare became real. Just over a month later on January 28, an
        unSYSTEM project called Darkleaks was unveiled, with working code. On
        February 11, the purported lead programmer for the Silk Road 2.0 announced a
        Darkleaks auction for pretty much every last bit of data the website backend
        had to offer, from user tables to source code. And the initial data leaks
        appear to be authentic. As the pseudonymous Zozan Cudi declared in the
        Darkleaks announcement, “The gloves are off. The revolt has begun.”
      </p>
      <p>
        For an in-depth overview this leak so far, see “The Silk Road 2.0 Database
        Is Up For Grabs in the First Darkleaks Auction” by Andrea Castillo.
      </p>

      <h2>Suggested Readings and Actions</h2>

      <h3>Stoic Literature</h3>
      <p>
        Stoic wisdom has guided great men throughout history and will continue to do
        so.
      </p>
      <ul>
        <li>
          <em>Meditations</em> by Marcus Aurelius (Translations in this post are from
          the Penguin Classics edition)
        </li>
        <li><em>Moral Letters to Lucilius</em> by Seneca</li>
        <li><em>Enchidrion</em> by Epictetus</li>
        <li><em>The Obstacle is the Way</em> by Ryan Holiday</li>
      </ul>

      <h3>The Cypherpunks and Crypto-Anarchy</h3>
      <p>
        The better you understand crypto-anarchy, the better you can contend with
        the future.
      </p>
      <ul>
        <li>Satoshi Nakamoto Institute</li>
        <li>Cypherpunk mailing list archives</li>
        <li>Nick Szabo’s Essays, Papers, and Concise Tutorials</li>
        <li><em>This Machine Kills Secrets</em> by Andy Greenberg</li>
        <li><em>Crypto</em> by Steven Levy</li>
      </ul>

      <h3>Tutorials</h3>
      <p>
        Friends don’t let friends not understand basic GPG and Bitcoin security.
      </p>
      <ul>
        <li>“Please To PGP (Guide for Linux, OS X, Windows)” by Pete Dushenski</li>
        <li>
          “On Making High-Entropy Paper Wallets” by Pete Dushenski (Make it even
          easier with Pierre Rochard and my Entropic)
        </li>
        <li>“Biting Into The WoT Elephant (And IRC Nicknames)” by Pete Dushenski</li>
        <li>“The Six Pillars for Surviving in Computer Times” by Pete Dushenski</li>
      </ul>

      <h3>Information Diets and Media Manipulation</h3>
      <p>
        Everything you read is probably a lie. Keep your signal to noise ratio as
        high as possible.
      </p>
      <ul>
        <li><em>Trust Me, I’m Lying</em> by Ryan Holiday</li>
        <li><em>Fooled by Randomness</em> by Nassim Nicholas Taleb</li>
      </ul>
    </>
  );
}

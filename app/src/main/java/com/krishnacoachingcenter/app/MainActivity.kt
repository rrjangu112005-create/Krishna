package com.krishnacoachingcenter.app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.graphics.Typeface
import android.view.Gravity
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.card.MaterialCardView

class MainActivity : AppCompatActivity() {

    private val phone = "6375630291"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(buildHome())
    }

    private fun buildHome(): ScrollView {
        val scroll = ScrollView(this)

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(32, 36, 32, 36)
        }

        val title = TextView(this).apply {
            text = "कृष्ण कोचिंग सेंटर"
            textSize = 30f
            gravity = Gravity.CENTER
            setTypeface(null, Typeface.BOLD)
        }
        root.addView(title, lp())

        val subtitle = TextView(this).apply {
            text = "गुड़ा भगवानदास\nराजस्थान प्रतियोगी परीक्षाओं की तैयारी"
            textSize = 17f
            gravity = Gravity.CENTER
            setPadding(0, 10, 0, 26)
        }
        root.addView(subtitle, lp())

        section(root, "🎯 परीक्षा तैयारी", listOf(
            "राजस्थान CET",
            "राजस्थान पुलिस",
            "पटवारी",
            "BDO / ग्राम विकास अधिकारी",
            "अन्य राजस्थान भर्ती"
        ))

        section(root, "📚 अध्ययन सामग्री", listOf(
            "PDF Notes",
            "विषयवार Notes",
            "Previous Year Papers",
            "Question Bank",
            "Current Affairs",
            "Mock Test"
        ))

        section(root, "📝 विषयवार अभ्यास", listOf(
            "सामान्य ज्ञान",
            "राजस्थान सामान्य ज्ञान",
            "हिंदी",
            "गणित",
            "रीजनिंग",
            "करेंट अफेयर्स"
        ))

        val contact = MaterialButton(this).apply {
            text = "📞 संपर्क करें 63756-30291"
            setOnClickListener {
                startActivity(
                    Intent(
                        Intent.ACTION_DIAL,
                        Uri.parse("tel:$phone")
                    )
                )
            }
        }

        root.addView(contact, lp(18))

        val note = TextView(this).apply {
            text = "नोट: PDF, Notes और अन्य अध्ययन सामग्री के वास्तविक लिंक बाद में जोड़े जा सकते हैं।"
            textSize = 13f
            setPadding(8, 22, 8, 8)
        }

        root.addView(note, lp())

        scroll.addView(root)
        return scroll
    }

    private fun section(
        root: LinearLayout,
        heading: String,
        items: List<String>
    ) {
        val h = TextView(this).apply {
            text = heading
            textSize = 21f
            setTypeface(null, Typeface.BOLD)
            setPadding(0, 22, 0, 10)
        }

        root.addView(h, lp())

        items.forEach { item ->

            val card = MaterialCardView(this).apply {
                radius = 20f
                cardElevation = 3f
                setContentPadding(22, 18, 22, 18)
            }

            val text = TextView(this).apply {
                text = item
                textSize = 17f
            }

            card.addView(
                text,
                ViewGroup.LayoutParams(-1, -2)
            )

            root.addView(card, lp(8))
        }
    }

    private fun lp(top: Int = 0): LinearLayout.LayoutParams {
        return LinearLayout.LayoutParams(-1, -2).apply {
            topMargin = top
        }
    }
}
